"use client";

import { useEffect, useState } from "react";
import { fetchGooglePlaceReviews, GooglePlaceSummary } from "@/lib/googlePlaceReviews";
import GoogleReviewsCarousel from "./GoogleReviewsCarousel";
import { Star, ExternalLink, AlertCircle } from "lucide-react";

export default function GoogleReviewsSection() {
  const [summary, setSummary] = useState<GooglePlaceSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchGooglePlaceReviews();
        if (isMounted) {
          setSummary(data);
        }
      } catch (err: any) {
        console.warn("Failed to load Google Place reviews:", err);
        if (isMounted) {
          setError(err.message || "Google reviews temporarily unavailable");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const placeUrl = summary?.googleMapsUrl || "https://www.google.com/maps";
  const ratingVal = summary?.rating ? summary.rating.toFixed(1) : "5.0";
  const countVal = summary?.userRatingCount ? summary.userRatingCount : null;

  return (
    <section className="relative z-10 w-full bg-[var(--color-beige)] text-[var(--color-green)] px-6 sm:px-10 md:px-16 lg:px-20 pt-2 sm:pt-4 lg:pt-6 pb-16 sm:pb-24 lg:pb-28 overflow-hidden space-y-10 sm:space-y-12">
      {/* ── Header Block (Identical positioning & padding as AboutSection intro) ── */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 min-w-0">
        <div className="max-w-4xl min-w-0">
          {/* Eyebrow Pill Badge (Identical to AboutSection) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-green)]/25 bg-[var(--color-green)]/5 text-xs font-semibold tracking-[0.25em] uppercase text-[var(--color-green)] mb-6 sm:mb-8 shadow-sm">
            <span>GUEST STORIES</span>
          </div>

          {/* Section Heading (Identical font clamp, scale & leading to AboutSection intro heading) */}
          <h2 className="font-[family-name:var(--font-grandslang)] text-[clamp(1.85rem,4vw,3.5rem)] leading-[1.08] text-[var(--color-green)] font-normal tracking-tight">
            Words from our travellers
          </h2>

          <p className="font-[family-name:var(--font-ogg)] text-base sm:text-lg text-[var(--color-green-70)] leading-relaxed mt-4 sm:mt-6">
            Authentic experiences shared by our guests on Google Maps.
          </p>
        </div>

        {/* Rating Summary & Official Google Maps Badge */}
        {summary && (
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-beige)]/80 border border-[var(--color-green)]/15 shrink-0 self-start md:self-auto shadow-sm">
            {/* Google G Icon */}
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-xs shrink-0 p-2">
              <svg className="w-full h-full" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 6-.1 7.95-2.82l-3.88-3.05c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.15C3.26 21.4 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.33c-.25-.72-.38-1.49-.38-2.33s.13-1.61.38-2.33V6.52H1.29C.47 8.16 0 10.03 0 12s.47 3.84 1.29 5.48l3.98-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.6 1.29 6.52l3.98 3.15c.95-2.85 3.6-4.92 6.73-4.92z"/>
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-grandslang)] text-xl font-semibold text-[var(--color-green)]">
                  {ratingVal}
                </span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
                  ))}
                </div>
              </div>

              <a
                href={placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-green-70)] hover:text-[var(--color-green)] hover:underline mt-0.5"
              >
                <span>{countVal ? `${countVal} Google Reviews` : "View on Google Maps"}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ── Full-Bleed Carousel Track (Breaks out to 100% viewport width via negative margins) ── */}
      <div className="-mx-6 sm:-mx-10 md:-mx-16 lg:-mx-20 w-[calc(100%+3rem)] sm:w-[calc(100%+5rem)] md:w-[calc(100%+8rem)] lg:w-[calc(100%+10rem)] relative">
        {loading ? (
          <div className="px-6 sm:px-10 md:px-16 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-56 rounded-3xl bg-[var(--color-beige)]/40 border border-[var(--color-green)]/10 animate-pulse p-6 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-green)]/15" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 bg-[var(--color-green)]/15 rounded w-1/2" />
                    <div className="h-3 bg-[var(--color-green)]/10 rounded w-1/3" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-[var(--color-green)]/15 rounded w-full" />
                  <div className="h-3 bg-[var(--color-green)]/15 rounded w-5/6" />
                  <div className="h-3 bg-[var(--color-green)]/10 rounded w-2/3" />
                </div>
                <div className="h-3 bg-[var(--color-green)]/10 rounded w-1/4 pt-2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="px-6 sm:px-10 md:px-16 lg:px-20">
            <div className="p-8 rounded-3xl bg-[var(--color-beige)]/40 border border-[var(--color-green)]/15 text-center max-w-xl mx-auto space-y-3">
              <AlertCircle className="w-8 h-8 text-[var(--color-green)]/60 mx-auto" />
              <p className="font-[family-name:var(--font-ogg)] text-base text-[var(--color-green-70)]">
                Google reviews are temporarily unavailable.
              </p>
              <a
                href={`https://www.google.com/maps/place/?q=place_id:${summary?.googleMapsUrl || 'ChIJ4xNg7A0v4joRXQvteARj8Hg'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-green)] underline font-semibold"
              >
                <span>View our profile on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : summary && summary.reviews.length > 0 ? (
          <GoogleReviewsCarousel reviews={summary.reviews} />
        ) : (
          <div className="px-6 sm:px-10 md:px-16 lg:px-20">
            <div className="p-8 rounded-3xl bg-[var(--color-beige)]/40 border border-[var(--color-green)]/15 text-center max-w-xl mx-auto space-y-2">
              <p className="font-[family-name:var(--font-ogg)] text-base text-[var(--color-green-70)]">
                No written 5-star reviews returned at this time.
              </p>
              <a
                href={placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-green)] underline font-semibold"
              >
                <span>Read all reviews on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer Disclaimer (Identical alignment & padding as AboutSection) ── */}
      <div className="w-full">
        <div className="pt-4 border-t border-[var(--color-green)]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--color-green-70)]">
          <p className="text-center sm:text-left">
            5-star reviews selected by Google, shown newest-first within the returned results.
          </p>

          <a
            href={placeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 uppercase tracking-wider text-[var(--color-green)] font-semibold hover:underline shrink-0"
          >
            <span>Powered by Google Places</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
