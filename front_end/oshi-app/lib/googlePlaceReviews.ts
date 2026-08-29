import { loadGoogleMapsApi } from "./googleMaps";

export const GOOGLE_REVIEWS_PLACE_ID = "ChIJ4xNg7A0v4joRXQvteARj8Hg";

export interface GooglePlaceReview {
  id: string;
  reviewerName: string;
  reviewerProfileUrl: string | null;
  reviewerPhotoUrl: string | null;
  rating: number;
  content: string;
  publishTime: string | null;
  relativePublishTime: string | null;
  googleMapsUrl: string | null;
}

export interface GooglePlaceSummary {
  displayName: string | null;
  rating: number | null;
  userRatingCount: number | null;
  googleMapsUrl: string | null;
  reviews: GooglePlaceReview[];
}

let cachedSummary: { data: GooglePlaceSummary; timestamp: number } | null = null;
let activeFetchPromise: Promise<GooglePlaceSummary> | null = null;
const CACHE_TTL_MS = 45 * 60 * 1000; // 45-minute client cache

/**
 * Fetches Google Place reviews using the modern Google Places Library (Place.fetchFields).
 * Filters to written 5-star reviews and sorts by publishTime descending (newest first).
 */
export async function fetchGooglePlaceReviews(forceRefresh = false): Promise<GooglePlaceSummary> {
  if (typeof window === "undefined") {
    return {
      displayName: null,
      rating: null,
      userRatingCount: null,
      googleMapsUrl: null,
      reviews: [],
    };
  }

  // Return cached result if valid
  const now = Date.now();
  if (!forceRefresh && cachedSummary && now - cachedSummary.timestamp < CACHE_TTL_MS) {
    return cachedSummary.data;
  }

  // Reuse existing promise if fetch is in progress
  if (activeFetchPromise && !forceRefresh) {
    return activeFetchPromise;
  }

  activeFetchPromise = (async () => {
    try {
      const google = await loadGoogleMapsApi();

      let PlaceClass: typeof google.maps.places.Place | undefined;
      if (google.maps.importLibrary) {
        const placesLib = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
        PlaceClass = placesLib.Place;
      } else if (google.maps.places?.Place) {
        PlaceClass = google.maps.places.Place;
      }

      if (!PlaceClass) {
        throw new Error("Google Places Library 'Place' class is unavailable");
      }

      const place = new PlaceClass({
        id: GOOGLE_REVIEWS_PLACE_ID,
      });

      await place.fetchFields({
        fields: [
          "displayName",
          "rating",
          "userRatingCount",
          "reviews",
          "googleMapsURI",
        ],
      });

      const rawReviews = (place.reviews || []) as any[];
      const placeMapsUrl = place.googleMapsURI || `https://www.google.com/maps/place/?q=place_id:${GOOGLE_REVIEWS_PLACE_ID}`;

      // Transform raw Google Place reviews into frontend safe type
      const transformedReviews: GooglePlaceReview[] = rawReviews
        .map((rev, index): GooglePlaceReview | null => {
          const rating = typeof rev.rating === "number" ? rev.rating : 0;
          
          // Prefer originalText, then text
          let content = "";
          if (typeof rev.originalText === "string") {
            content = rev.originalText;
          } else if (rev.originalText && typeof rev.originalText.text === "string") {
            content = rev.originalText.text;
          } else if (typeof rev.text === "string") {
            content = rev.text;
          } else if (rev.text && typeof rev.text.text === "string") {
            content = rev.text.text;
          }

          content = content.trim();

          // Require 5-star rating AND non-empty text content
          if (rating !== 5 || !content) {
            return null;
          }

          const author = rev.authorAttribution || {};
          const reviewerName = author.displayName || "Google Contributor";
          const reviewerProfileUrl = author.uri || null;
          const reviewerPhotoUrl = author.photoURI || null;

          let publishTime: string | null = null;
          if (rev.publishTime) {
            if (typeof rev.publishTime === "string") {
              publishTime = rev.publishTime;
            } else if (rev.publishTime instanceof Date) {
              publishTime = rev.publishTime.toISOString();
            } else if (typeof rev.publishTime.toISOString === "function") {
              publishTime = rev.publishTime.toISOString();
            }
          }

          const relativePublishTime = rev.relativePublishTimeDescription || null;
          const googleMapsUrl = rev.googleMapsURI || placeMapsUrl;

          // Stable deterministic ID
          const id =
            googleMapsUrl && googleMapsUrl !== placeMapsUrl
              ? googleMapsUrl
              : `${reviewerName}-${publishTime || index}-${content.slice(0, 20).replace(/\s+/g, "_")}`;

          return {
            id,
            reviewerName,
            reviewerProfileUrl,
            reviewerPhotoUrl,
            rating,
            content,
            publishTime,
            relativePublishTime,
            googleMapsUrl,
          };
        })
        .filter((rev): rev is GooglePlaceReview => rev !== null);

      // Sort by publishTime descending (newest first)
      transformedReviews.sort((a, b) => {
        const timeA = a.publishTime ? new Date(a.publishTime).getTime() : 0;
        const timeB = b.publishTime ? new Date(b.publishTime).getTime() : 0;
        return timeB - timeA;
      });

      // Google Place API returns at most 5 reviews
      const finalReviews = transformedReviews.slice(0, 5);

      const summary: GooglePlaceSummary = {
        displayName: place.displayName || "OSHĪ Ceylon",
        rating: typeof place.rating === "number" ? place.rating : 5.0,
        userRatingCount: typeof place.userRatingCount === "number" ? place.userRatingCount : null,
        googleMapsUrl: placeMapsUrl,
        reviews: finalReviews,
      };

      cachedSummary = {
        data: summary,
        timestamp: Date.now(),
      };

      return summary;
    } finally {
      activeFetchPromise = null;
    }
  })();

  return activeFetchPromise;
}
