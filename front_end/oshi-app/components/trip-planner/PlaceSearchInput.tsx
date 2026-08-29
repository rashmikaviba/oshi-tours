"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { PlaceItem, getLandmarkSummary } from "@/types/tripPlanner";
import { loadGoogleMapsApi } from "@/lib/googleMaps";
import { Search, Loader2, MapPin, X } from "lucide-react";

interface Props {
  onPlaceSelect: (place: PlaceItem) => void;
  placeholder?: string;
}

interface PredictionItem {
  placeId: string;
  mainText: string;
  secondaryText: string;
  description: string;
}

export default function PlaceSearchInput({
  onPlaceSelect,
  placeholder = "Add a place (e.g. Sigiriya, Kandy, Galle)...",
}: Props) {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState<PredictionItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const dummyDivRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Google Services
  useEffect(() => {
    loadGoogleMapsApi()
      .then((google) => {
        if (google && google.maps && google.maps.places) {
          autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
          if (dummyDivRef.current) {
            placesServiceRef.current = new google.maps.places.PlacesService(dummyDivRef.current);
          }
          sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
        }
      })
      .catch((err) => {
        console.warn("Google Maps API search unavailable:", err);
      });
  }, []);

  // Debounced Search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setPredictions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    const timer = setTimeout(() => {
      if (autocompleteServiceRef.current && window.google?.maps) {
        const request: google.maps.places.AutocompletionRequest = {
          input: query,
          componentRestrictions: { country: "lk" }, // Bias to Sri Lanka
          sessionToken: sessionTokenRef.current || undefined,
        };

        autocompleteServiceRef.current.getPlacePredictions(request, (results, status) => {
          setIsLoading(false);
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const list: PredictionItem[] = results.map((item) => ({
              placeId: item.place_id,
              mainText: item.structured_formatting.main_text,
              secondaryText: item.structured_formatting.secondary_text || "",
              description: item.description,
            }));
            setPredictions(list);
            setIsOpen(true);
            setSelectedIndex(-1);
          } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            setPredictions([]);
            setIsOpen(true);
          } else {
            setErrorMsg("Could not fetch suggestions");
            setPredictions([]);
          }
        });
      } else {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch Place Details and trigger selection
  const handleSelectPrediction = useCallback(
    (item: PredictionItem) => {
      setQuery("");
      setIsOpen(false);
      setPredictions([]);

      const landmarkFallback = getLandmarkSummary(item.mainText, item.description);

      if (placesServiceRef.current && window.google?.maps) {
        const request: google.maps.places.PlaceDetailsRequest = {
          placeId: item.placeId,
          fields: [
            "place_id",
            "name",
            "formatted_address",
            "geometry",
            "photos",
            "editorial_summary",
            "url",
            "types",
          ],
          sessionToken: sessionTokenRef.current || undefined,
        };

        placesServiceRef.current.getDetails(request, (place, status) => {
          if (window.google?.maps?.places) {
            sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
          }

          if (status === google.maps.places.PlacesServiceStatus.OK && place && place.geometry?.location) {
            const photoUrl =
              place.photos && place.photos.length > 0
                ? place.photos[0].getUrl({ maxWidth: 400 })
                : landmarkFallback.photoUrl;

            const photoAttribution =
              place.photos && place.photos.length > 0 && place.photos[0].html_attributions
                ? place.photos[0].html_attributions[0]
                : undefined;

            const newPlace: PlaceItem = {
              id: place.place_id || `place_${Date.now()}`,
              placeId: place.place_id,
              name: place.name || item.mainText,
              formattedAddress: place.formatted_address || item.description,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              mapsUrl: place.url,
              photoUrl,
              photoAttribution,
              editorialSummary: (place as any).editorial_summary?.overview || landmarkFallback.summary,
              types: place.types,
            };

            onPlaceSelect(newPlace);
          } else {
            const fallbackPlace: PlaceItem = {
              id: item.placeId,
              placeId: item.placeId,
              name: item.mainText,
              formattedAddress: item.description,
              lat: 7.8731,
              lng: 80.7718,
              photoUrl: landmarkFallback.photoUrl,
              editorialSummary: landmarkFallback.summary,
            };
            onPlaceSelect(fallbackPlace);
          }
        });
      } else {
        const customPlace: PlaceItem = {
          id: `custom_${Date.now()}`,
          name: item.mainText,
          formattedAddress: item.description,
          lat: 7.8731,
          lng: 80.7718,
          photoUrl: landmarkFallback.photoUrl,
          editorialSummary: landmarkFallback.summary,
        };
        onPlaceSelect(customPlace);
      }
    },
    [onPlaceSelect]
  );

  // Manual Enter submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || predictions.length === 0) {
      if (e.key === "Enter" && query.trim()) {
        e.preventDefault();
        const fallback = getLandmarkSummary(query.trim());
        onPlaceSelect({
          id: `manual_${Date.now()}`,
          name: query.trim(),
          formattedAddress: "Location in Sri Lanka",
          lat: 7.8731,
          lng: 80.7718,
          photoUrl: fallback.photoUrl,
          editorialSummary: fallback.summary,
        });
        setQuery("");
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < predictions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : predictions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < predictions.length) {
        handleSelectPrediction(predictions[selectedIndex]);
      } else if (predictions.length > 0) {
        handleSelectPrediction(predictions[0]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full">
      <div ref={dummyDivRef} className="hidden" />

      {/* Input Box */}
      <div className="relative flex items-center">
        <MapPin className="absolute left-4 w-4 h-4 text-[var(--color-green)]/40 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-[var(--color-beige)]/50 border border-[var(--color-green)]/20 rounded-xl pl-11 pr-10 py-3 text-sm font-[family-name:var(--font-ogg)] text-[var(--color-green)] placeholder-[var(--color-green)]/40 focus:outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/10 transition-all duration-300"
        />
        {isLoading ? (
          <Loader2 className="absolute right-3.5 w-4 h-4 text-[var(--color-green)] animate-spin" />
        ) : query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setPredictions([]);
              setIsOpen(false);
            }}
            className="absolute right-3.5 p-1 text-[var(--color-green)]/40 hover:text-[var(--color-green)]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Search className="absolute right-3.5 w-4 h-4 text-[var(--color-green)]/30 pointer-events-none" />
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 top-full mt-1 z-30 bg-[var(--color-white)] border border-[var(--color-green)]/15 rounded-xl shadow-xl overflow-hidden max-h-64 overflow-y-auto"
        >
          {predictions.length > 0 ? (
            <div>
              {predictions.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.placeId}
                    type="button"
                    onClick={() => handleSelectPrediction(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left px-4 py-3 border-b border-[var(--color-green)]/5 last:border-0 transition-colors flex items-start gap-3 ${
                      isSelected
                        ? "bg-[var(--color-green)]/5 text-[var(--color-green)]"
                        : "hover:bg-[var(--color-beige)]/60 text-[var(--color-green)]"
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-[var(--color-green)] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm font-[family-name:var(--font-ogg)]">
                        {item.mainText}
                      </div>
                      {item.secondaryText && (
                        <div className="text-xs text-[var(--color-green-70)]">
                          {item.secondaryText}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}

              <div className="px-4 py-1.5 bg-[var(--color-beige)]/40 text-[10px] text-right font-mono text-[var(--color-green)]/50 tracking-wider">
                Powered by Google
              </div>
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-xs text-[var(--color-green-70)]">
              {errorMsg ? errorMsg : "No matching places found. Press Enter to add manually."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
