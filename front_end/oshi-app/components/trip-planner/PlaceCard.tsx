"use client";

import { PlaceItem, getLandmarkSummary } from "@/types/tripPlanner";
import { MapPin, ExternalLink, Trash2 } from "lucide-react";

interface Props {
  place: PlaceItem;
  index: number;
  onRemove: (id: string) => void;
  onSelect?: (place: PlaceItem) => void;
  isSelected?: boolean;
}

export default function PlaceCard({ place, index, onRemove, onSelect, isSelected }: Props) {
  const fallback = getLandmarkSummary(place.name, place.formattedAddress);
  const photo = place.photoUrl || fallback.photoUrl;
  const description = place.editorialSummary || fallback.summary;
  const googleMapsUrl =
    place.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.formattedAddress)}`;

  return (
    <div
      onClick={() => onSelect && onSelect(place)}
      className={`group relative flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-[var(--color-beige)]/70 border transition-all duration-300 ${
        isSelected
          ? "border-[var(--color-green)] ring-2 ring-[var(--color-green)]/15 shadow-sm"
          : "border-[var(--color-green)]/15 hover:border-[var(--color-green)]/30 hover:bg-[var(--color-beige)]/90"
      } cursor-pointer select-none`}
    >
      {/* Index Badge */}
      <div className="absolute top-3 left-3 z-10 w-6 h-6 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] text-xs font-mono font-bold flex items-center justify-center shadow-sm">
        {index + 1}
      </div>

      {/* Place Photo or Fallback Thumbnail */}
      <div className="relative w-full sm:w-32 h-36 sm:h-32 rounded-xl overflow-hidden bg-[var(--color-green)]/10 flex-shrink-0">
        {photo ? (
          <img
            src={photo}
            alt={place.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-[var(--color-green-70)] bg-[var(--color-green)]/5">
            <MapPin className="w-6 h-6 mb-1 opacity-60 text-[var(--color-green)]" />
            <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Sri Lanka</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between pt-1 sm:pt-0">
        <div>
          <div className="flex items-start justify-between gap-2 pr-6">
            <h4 className="font-[family-name:var(--font-grandslang)] text-lg font-bold text-[var(--color-green)] leading-snug">
              {place.name}
            </h4>
          </div>

          {place.formattedAddress && (
            <div className="flex items-start gap-1.5 text-xs text-[var(--color-green-70)] mt-1 leading-relaxed">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-green)] shrink-0 mt-0.5" />
              <span className="line-clamp-1">{place.formattedAddress}</span>
            </div>
          )}

          {description && (
            <p className="font-[family-name:var(--font-ogg)] text-xs text-[var(--color-green)]/80 mt-2 line-clamp-3 leading-relaxed italic bg-[var(--color-beige)]/40 p-2.5 rounded-xl border border-[var(--color-green)]/10">
              "{description}"
            </p>
          )}
        </div>

        {/* Footer Actions & Links */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[var(--color-green)]/10 text-xs">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[11px] font-mono tracking-wider text-[var(--color-green-70)] hover:text-[var(--color-green)] transition-colors"
          >
            <span>Open in Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {place.photoAttribution && (
            <span
              className="text-[9px] text-[var(--color-green)]/40 truncate max-w-[120px]"
              dangerouslySetInnerHTML={{ __html: place.photoAttribution }}
              onClick={(e) => e.stopPropagation()}
            />
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(place.id);
            }}
            aria-label={`Remove ${place.name}`}
            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
