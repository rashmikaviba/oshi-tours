"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ItineraryDay, PlaceItem, getLandmarkSummary } from "@/types/tripPlanner";
import { loadGoogleMapsApi, OSHI_MAP_STYLE } from "@/lib/googleMaps";
import PlaceSearchInput from "./PlaceSearchInput";
import { MapPin, X, Globe, Plus, Compass } from "lucide-react";

interface Props {
  itinerary: ItineraryDay[];
  activePinDate: string | null;
  activePinDateDisplay?: string;
  onCancelPinMode: () => void;
  onPinAddPlace: (dateString: string, place: PlaceItem) => void;
  onMarkerSelectPlace?: (place: PlaceItem) => void;
  selectedPlaceId?: string;
}

export default function TripPlannerMap({
  itinerary,
  activePinDate,
  activePinDateDisplay,
  onCancelPinMode,
  onPinAddPlace,
  onMarkerSelectPlace,
  selectedPlaceId,
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Google Maps Refs
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const googleMarkersRef = useRef<{ [key: string]: google.maps.Marker }>({});
  const searchedMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const [mapEngine, setMapEngine] = useState<"google" | "fallback" | "loading">("loading");
  const [googleLoadError, setGoogleLoadError] = useState<string | null>(null);
  const [selectedDayDate, setSelectedDayDate] = useState<string>(itinerary[0]?.dateString || "");

  // Update selected day date default when itinerary changes
  useEffect(() => {
    if (itinerary.length > 0 && !selectedDayDate) {
      setSelectedDayDate(itinerary[0].dateString);
    }
  }, [itinerary, selectedDayDate]);

  // 1. Initialize Google Maps
  useEffect(() => {
    if (!mapContainerRef.current) return;
    let isMounted = true;

    loadGoogleMapsApi()
      .then((google) => {
        if (!isMounted || !mapContainerRef.current) return;

        const mapOptions: google.maps.MapOptions = {
          center: { lat: 7.8731, lng: 80.7718 }, // Sri Lanka center
          zoom: 8,
          styles: OSHI_MAP_STYLE,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          // Requirement 2: Direct mouse scroll wheel zoom without requiring Ctrl
          gestureHandling: "greedy",
        };

        const map = new google.maps.Map(mapContainerRef.current, mapOptions);
        googleMapRef.current = map;
        infoWindowRef.current = new google.maps.InfoWindow();
        geocoderRef.current = new google.maps.Geocoder();

        (window as any).gm_authFailure = () => {
          console.warn("Google Maps auth failure callback triggered.");
          if (isMounted) {
            setGoogleLoadError("Google Maps Key authentication error");
            setMapEngine("fallback");
          }
        };

        setMapEngine("google");
      })
      .catch((err) => {
        console.warn("Google Maps failed to load:", err);
        if (isMounted) {
          setGoogleLoadError(err.message || "Google Maps API Key required");
          setMapEngine("fallback");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Render Google Maps Markers
  useEffect(() => {
    if (mapEngine !== "google" || !googleMapRef.current || !window.google?.maps) return;

    const map = googleMapRef.current;
    Object.values(googleMarkersRef.current).forEach((m) => m.setMap(null));
    googleMarkersRef.current = {};

    const allPlaces: { place: PlaceItem; dayIndex: number; placeIndex: number }[] = [];
    itinerary.forEach((day, dIdx) => {
      day.places.forEach((p, pIdx) => {
        allPlaces.push({ place: p, dayIndex: dIdx, placeIndex: pIdx });
      });
    });

    if (allPlaces.length === 0) return;

    const bounds = new google.maps.LatLngBounds();

    allPlaces.forEach(({ place, placeIndex }) => {
      if (typeof place.lat !== "number" || typeof place.lng !== "number") return;
      const position = { lat: place.lat, lng: place.lng };
      bounds.extend(position);

      const svgPin = {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
        fillColor: "#3B5937",
        fillOpacity: 1,
        strokeColor: "#F4F5F0",
        strokeWeight: 2,
        scale: 1.8,
        anchor: new google.maps.Point(12, 22),
        labelOrigin: new google.maps.Point(12, 9),
      };

      const marker = new google.maps.Marker({
        position,
        map,
        title: place.name,
        icon: svgPin,
        label: {
          text: String(placeIndex + 1),
          color: "#F4F5F0",
          fontSize: "10px",
          fontWeight: "bold",
        },
      });

      marker.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.setContent(`
            <div style="padding:6px; max-width:220px; font-family:sans-serif;">
              <h4 style="margin:0; font-size:14px; font-weight:bold; color:#2C3E2D;">${place.name}</h4>
              <p style="margin:4px 0 0; font-size:11px; color:#667064;">${place.formattedAddress || ""}</p>
            </div>
          `);
          infoWindowRef.current.open(map, marker);
        }
        if (onMarkerSelectPlace) onMarkerSelectPlace(place);
      });

      googleMarkersRef.current[place.id] = marker;
    });

    if (allPlaces.length > 1 && !searchedMarkerRef.current) {
      map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });
    } else if (allPlaces.length === 1 && !searchedMarkerRef.current) {
      map.setCenter({ lat: allPlaces[0].place.lat, lng: allPlaces[0].place.lng });
      map.setZoom(13);
    }
  }, [mapEngine, itinerary, onMarkerSelectPlace]);

  // 3. Focus Google Map when selectedPlaceId changes
  useEffect(() => {
    if (!selectedPlaceId || mapEngine !== "google" || !googleMapRef.current) return;
    const marker = googleMarkersRef.current[selectedPlaceId];
    if (marker && googleMapRef.current) {
      const pos = marker.getPosition();
      if (pos) {
        googleMapRef.current.panTo(pos);
        googleMapRef.current.setZoom(14);
      }
    }
  }, [selectedPlaceId, mapEngine]);

  // 4. Handle Reverse Geocoding Click Pin Mode
  useEffect(() => {
    if (!activePinDate || mapEngine !== "google" || !googleMapRef.current) return;

    const map = googleMapRef.current;
    map.setOptions({ draggableCursor: "crosshair" });

    const clickListener = map.addListener("click", (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      if (geocoderRef.current) {
        geocoderRef.current.geocode({ location: { lat, lng } }, (results, status) => {
          let placeName = "Pinned location";
          let formattedAddress = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          let placeId: string | undefined = undefined;

          if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
            placeId = results[0].place_id;
            formattedAddress = results[0].formatted_address;
            placeName = formattedAddress.split(",")[0] || "Pinned location";
          }

          const fallback = getLandmarkSummary(placeName, formattedAddress);

          onPinAddPlace(activePinDate, {
            id: `pin_${Date.now()}`,
            placeId,
            name: placeName,
            formattedAddress,
            lat,
            lng,
            photoUrl: fallback.photoUrl,
            editorialSummary: fallback.summary,
          });
        });
      } else {
        const fallback = getLandmarkSummary("Pinned location");
        onPinAddPlace(activePinDate, {
          id: `pin_${Date.now()}`,
          name: "Pinned location",
          formattedAddress: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          lat,
          lng,
          photoUrl: fallback.photoUrl,
          editorialSummary: fallback.summary,
        });
      }
    });

    return () => {
      google.maps.event.removeListener(clickListener);
      map.setOptions({ draggableCursor: null });
    };
  }, [mapEngine, activePinDate, onPinAddPlace]);

  // Requirement 5: In-Map Direct Search Place Handler
  const handleInMapSearchSelect = useCallback(
    (place: PlaceItem) => {
      const targetDate = activePinDate || selectedDayDate || itinerary[0]?.dateString;

      if (mapEngine === "google" && googleMapRef.current && window.google?.maps) {
        const map = googleMapRef.current;
        const position = { lat: place.lat, lng: place.lng };

        map.panTo(position);
        map.setZoom(14);

        if (searchedMarkerRef.current) {
          searchedMarkerRef.current.setMap(null);
        }

        const marker = new google.maps.Marker({
          position,
          map,
          title: place.name,
          animation: google.maps.Animation.DROP,
        });

        searchedMarkerRef.current = marker;

        if (infoWindowRef.current) {
          const div = document.createElement("div");
          div.className = "p-2 max-w-xs font-sans text-left";
          div.innerHTML = `
            <h4 style="margin:0; font-size:14px; font-weight:bold; color:#2C3E2D;">${place.name}</h4>
            <p style="margin:4px 0 8px; font-size:11px; color:#667064;">${place.formattedAddress || ""}</p>
            <button id="in-map-pin-btn" style="background:#3B5937; color:#F4F5F0; border:none; border-radius:12px; padding:6px 12px; font-size:11px; font-weight:bold; cursor:pointer; width:100%; display:flex; align-items:center; justify-content:center; gap:4px;">
              + Add to Itinerary
            </button>
          `;

          infoWindowRef.current.setContent(div);
          infoWindowRef.current.open(map, marker);

          setTimeout(() => {
            const btn = document.getElementById("in-map-pin-btn");
            if (btn) {
              btn.onclick = () => {
                if (targetDate) {
                  onPinAddPlace(targetDate, place);
                  if (infoWindowRef.current) infoWindowRef.current.close();
                }
              };
            }
          }, 100);
        }
      }

      // Automatically add place to selected day
      if (targetDate) {
        onPinAddPlace(targetDate, place);
      }
    },
    [mapEngine, activePinDate, selectedDayDate, itinerary, onPinAddPlace]
  );

  // Fallback Pin Mode Click handler for Native Map Canvas
  const handleFallbackCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!activePinDate) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;

    const lat = 9.8 - yRatio * (9.8 - 5.9);
    const lng = 79.6 + xRatio * (81.9 - 79.6);
    const fallback = getLandmarkSummary("Pinned location");

    onPinAddPlace(activePinDate, {
      id: `pin_${Date.now()}`,
      name: `Pinned Location (${lat.toFixed(2)}, ${lng.toFixed(2)})`,
      formattedAddress: `Custom route coordinate (${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E)`,
      lat,
      lng,
      photoUrl: fallback.photoUrl,
      editorialSummary: fallback.summary,
    });
  };

  const allItineraryPlaces: { place: PlaceItem; index: number }[] = [];
  itinerary.forEach((day) => {
    day.places.forEach((p) => {
      allItineraryPlaces.push({ place: p, index: allItineraryPlaces.length + 1 });
    });
  });

  return (
    <div className="relative w-full h-full min-h-[400px] bg-[var(--color-beige)] flex flex-col">
      {/* ── REQUIREMENT 5: IN-MAP FLOATING SEARCH BAR OVERLAY ── */}
      <div className="absolute top-4 left-4 right-4 z-[400] max-w-md mx-auto">
        <div className="bg-[var(--color-white)]/90 backdrop-blur-md p-2 rounded-2xl border border-[var(--color-green)]/20 shadow-xl flex items-center gap-2">
          <div className="flex-1">
            <PlaceSearchInput
              onPlaceSelect={handleInMapSearchSelect}
              placeholder="Search directly in map (e.g. Sigiriya, Kandy)..."
            />
          </div>
          {itinerary.length > 0 && (
            <select
              value={selectedDayDate}
              onChange={(e) => setSelectedDayDate(e.target.value)}
              className="bg-[var(--color-beige)] border border-[var(--color-green)]/20 rounded-xl px-2.5 py-2.5 text-xs font-mono text-[var(--color-green)] focus:outline-none focus:border-[var(--color-green)]"
              title="Target day for map search pins"
            >
              {itinerary.map((day, idx) => (
                <option key={day.dateString} value={day.dateString}>
                  Day {idx + 1} ({day.dateString.slice(5)})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Active Pin Mode Top Instruction Banner */}
      {activePinDate && (
        <div className="absolute top-20 left-4 right-4 z-[390] max-w-md mx-auto bg-[var(--color-green)] text-[var(--color-beige)] p-3 rounded-2xl shadow-xl flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-mono">
            <MapPin className="w-4 h-4 text-emerald-400 animate-bounce shrink-0" />
            <span>
              Click anywhere on map to pin location for{" "}
              <strong className="underline">{activePinDateDisplay || activePinDate}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={onCancelPinMode}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-beige)]/20 hover:bg-[var(--color-beige)]/30 text-xs font-mono text-[var(--color-beige)] transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
        </div>
      )}

      {/* Map Engine Badge (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-[300] bg-[var(--color-white)]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[var(--color-green)]/15 shadow-sm text-[10px] font-mono text-[var(--color-green)] flex items-center gap-1.5 pointer-events-none">
        <Globe className="w-3.5 h-3.5 text-[var(--color-green)]" />
        <span>{mapEngine === "google" ? "Google Maps Engine (Direct Wheel Zoom Enabled)" : "OSHĪ Interactive Map"}</span>
      </div>

      {/* ── GOOGLE MAP CONTAINER ── */}
      <div
        ref={mapContainerRef}
        className={`w-full h-full flex-1 rounded-none md:rounded-3xl overflow-hidden ${
          mapEngine === "google" ? "block" : "hidden"
        }`}
      />

      {/* ── NATIVE INTERACTIVE MAP CANVAS FALLBACK ── */}
      {mapEngine === "fallback" && (
        <div
          onClick={handleFallbackCanvasClick}
          className={`w-full h-full flex-1 rounded-none md:rounded-3xl overflow-hidden bg-[#EAEBE3] relative select-none ${
            activePinDate ? "cursor-crosshair" : "cursor-default"
          }`}
        >
          {/* Stylized Sri Lanka Island Graphic Background */}
          <div className="absolute inset-0 flex items-center justify-center p-8 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 160" className="w-full h-full max-h-[500px]" fill="#3B5937">
              <path d="M50 10 C 65 30, 85 70, 75 110 C 65 140, 45 155, 35 140 C 25 125, 20 90, 30 50 Z" />
            </svg>
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(#3B5937_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          {/* Render Places as Pins on Canvas */}
          {allItineraryPlaces.map(({ place, index }) => {
            const topPct = Math.max(10, Math.min(85, ((9.8 - place.lat) / (9.8 - 5.9)) * 100));
            const leftPct = Math.max(10, Math.min(85, ((place.lng - 79.6) / (81.9 - 79.6)) * 100));
            const isSelected = selectedPlaceId === place.id;

            return (
              <div
                key={place.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onMarkerSelectPlace) onMarkerSelectPlace(place);
                }}
                style={{ top: `${topPct}%`, left: `${leftPct}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-transform duration-300 cursor-pointer ${
                  isSelected ? "scale-125 z-40" : "hover:scale-110"
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] font-mono text-xs font-bold flex items-center justify-center border-2 border-[var(--color-white)] shadow-md">
                  {index}
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-[var(--color-white)] text-[10px] font-bold text-[var(--color-green)] shadow whitespace-nowrap">
                  {place.name}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
