"use client";

import { useState } from "react";
import Image from "next/image";
import { GooglePlaceReview } from "@/lib/googlePlaceReviews";
import { Star, ExternalLink, User } from "lucide-react";

interface Props {
  review: GooglePlaceReview;
  isDuplicate?: boolean;
}

export default function GoogleReviewCard({ review, isDuplicate = false }: Props) {
  const [imgError, setImgError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const maxCharLength = 200;
  const isLongText = review.content.length > maxCharLength;
  const displayText = isExpanded || !isLongText
    ? review.content
    : `${review.content.slice(0, maxCharLength).trim()}...`;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "G";
  };

  return (
    <article
      className="w-[300px] sm:w-[360px] md:w-[400px] shrink-0 bg-[var(--color-beige)]/60 border border-[var(--color-green)]/15 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-4 shadow-sm hover:border-[var(--color-green)]/35 transition-all duration-300 select-none text-[var(--color-green)]"
      tabIndex={isDuplicate ? -1 : undefined}
    >
      {/* Header: Author Avatar & Name */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar Image / Placeholder */}
          <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 bg-[var(--color-green)]/10 border border-[var(--color-green)]/20 flex items-center justify-center text-[var(--color-green)]">
            {review.reviewerPhotoUrl && !imgError ? (
              <Image
                src={review.reviewerPhotoUrl}
                alt=""
                fill
                className="object-cover"
                onError={() => setImgError(true)}
                unoptimized
              />
            ) : (
              <span className="font-mono text-xs font-bold tracking-wider">
                {getInitials(review.reviewerName)}
              </span>
            )}
          </div>

          {/* Author Name & Time */}
          <div className="min-w-0 flex-1">
            {review.reviewerProfileUrl && !isDuplicate ? (
              <a
                href={review.reviewerProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-grandslang)] text-base font-semibold text-[var(--color-green)] hover:underline truncate block"
                tabIndex={isDuplicate ? -1 : 0}
              >
                {review.reviewerName}
              </a>
            ) : (
              <span className="font-[family-name:var(--font-grandslang)] text-base font-semibold text-[var(--color-green)] truncate block">
                {review.reviewerName}
              </span>
            )}

            {review.relativePublishTime && (
              <span className="font-mono text-[10px] tracking-wider uppercase text-[var(--color-green-70)] block">
                {review.relativePublishTime}
              </span>
            )}
          </div>
        </div>

        {/* Google G Logo Badge */}
        <div className="shrink-0">
          <svg className="w-5 h-5 opacity-80" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 6-.1 7.95-2.82l-3.88-3.05c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.15C3.26 21.4 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.27 14.33c-.25-.72-.38-1.49-.38-2.33s.13-1.61.38-2.33V6.52H1.29C.47 8.16 0 10.03 0 12s.47 3.84 1.29 5.48l3.98-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.6 1.29 6.52l3.98 3.15c.95-2.85 3.6-4.92 6.73-4.92z"
            />
          </svg>
        </div>
      </div>

      {/* 5-Star Rating Row */}
      <div className="flex items-center gap-1" aria-label="5 out of 5 stars" role="img">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-emerald-700 text-emerald-700"
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Review Text */}
      <div className="flex-1">
        <p className="font-[family-name:var(--font-ogg)] text-sm sm:text-base text-[var(--color-green)] leading-relaxed">
          “{displayText}”
        </p>

        {isLongText && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--color-green)] font-semibold underline hover:text-opacity-80 transition-colors focus:outline-none"
            tabIndex={isDuplicate ? -1 : 0}
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>

      {/* Footer: Google Maps Link */}
      <div className="pt-3 border-t border-[var(--color-green)]/10 flex items-center justify-between text-[11px] font-mono text-[var(--color-green-70)]">
        <span className="uppercase tracking-wider">Posted on Google</span>

        {review.googleMapsUrl && !isDuplicate && (
          <a
            href={review.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 uppercase tracking-wider text-[var(--color-green)] font-bold hover:underline"
            tabIndex={isDuplicate ? -1 : 0}
          >
            <span>View on Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </article>
  );
}
