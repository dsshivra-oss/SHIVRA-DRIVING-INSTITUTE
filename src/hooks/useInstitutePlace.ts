import {useEffect, useState} from 'react';
import {useMapsLibrary} from '@vis.gl/react-google-maps';

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface PlaceReviewItem {
  authorName: string;
  authorUri?: string;
  rating?: number;
  relativeTime?: string;
  text: string;
  googleMapsUri?: string;
}

export interface InstitutePlaceData {
  loading: boolean;
  error: string | null;
  location: LatLngLiteral | null;
  displayName: string | null;
  formattedAddress: string | null;
  rating: number | null;
  userRatingCount: number | null;
  googleMapsURI: string | null;
  reviews: PlaceReviewItem[];
  isExactInstituteMatch: boolean;
}

interface RawPlaceReview {
  authorAttribution?: {
    displayName?: string | null;
    uri?: string | null;
  } | null;
  rating?: number | null;
  relativePublishTimeDescription?: string | null;
  text?: string | null;
  googleMapsURI?: string | null;
}

function isQuotaError(err: unknown): boolean {
  const text = err instanceof Error ? err.message : String(err);
  return (
    text.includes('429') ||
    text.includes('RESOURCE_EXHAUSTED') ||
    text.includes('OVER_QUERY_LIMIT') ||
    text.includes('quota')
  );
}

export function useInstitutePlace(): InstitutePlaceData {
  const placesLib = useMapsLibrary('places');
  const [state, setState] = useState<InstitutePlaceData>({
    loading: true,
    error: null,
    location: null,
    displayName: null,
    formattedAddress: null,
    rating: null,
    userRatingCount: null,
    googleMapsURI: null,
    reviews: [],
    isExactInstituteMatch: false,
  });

  useEffect(() => {
    if (!placesLib) return;

    let cancelled = false;

    async function lookupInstitute() {
      try {
        const {Place} = placesLib;
        const primaryResponse = await Place.searchByText({
          textQuery:
            'Shivra Driving Institute, Coimbatore Road, Annur, Tamil Nadu 641653',
          fields: [
            'id',
            'displayName',
            'formattedAddress',
            'location',
            'rating',
            'userRatingCount',
            'reviews',
            'googleMapsURI',
          ],
          region: 'IN',
          language: 'en',
          maxResultCount: 3,
        });

        const matchedPlace = primaryResponse.places?.[0];

        if (matchedPlace && matchedPlace.location) {
          const rawReviews = (matchedPlace.reviews || []) as RawPlaceReview[];
          const parsedReviews: PlaceReviewItem[] = rawReviews
            .filter((rev) => Boolean(rev.text))
            .map((rev) => ({
              authorName: rev.authorAttribution?.displayName || 'Google User',
              authorUri: rev.authorAttribution?.uri || undefined,
              rating: rev.rating ?? undefined,
              relativeTime: rev.relativePublishTimeDescription || undefined,
              text: rev.text || '',
              googleMapsUri: rev.googleMapsURI || undefined,
            }));

          const isExact = Boolean(
            matchedPlace.displayName &&
              matchedPlace.displayName.toLowerCase().includes('shivra')
          );

          if (!cancelled) {
            setState({
              loading: false,
              error: null,
              location: {
                lat: matchedPlace.location.lat(),
                lng: matchedPlace.location.lng(),
              },
              displayName: matchedPlace.displayName || null,
              formattedAddress: matchedPlace.formattedAddress || null,
              rating: matchedPlace.rating ?? null,
              userRatingCount: matchedPlace.userRatingCount ?? null,
              googleMapsURI: matchedPlace.googleMapsURI || null,
              reviews: isExact ? parsedReviews : [],
              isExactInstituteMatch: isExact,
            });
          }
          return;
        }

        // Secondary lookup strictly via Places API for Annur landmark if institute isn't indexed by name
        const landmarkResponse = await Place.searchByText({
          textQuery: 'Panchayat Union Office Annur Tamil Nadu 641653',
          fields: ['displayName', 'formattedAddress', 'location', 'googleMapsURI'],
          region: 'IN',
          language: 'en',
          maxResultCount: 1,
        });

        const landmark = landmarkResponse.places?.[0];
        if (!cancelled) {
          setState({
            loading: false,
            error: null,
            location: landmark?.location
              ? {
                  lat: landmark.location.lat(),
                  lng: landmark.location.lng(),
                }
              : null,
            displayName: landmark?.displayName || null,
            formattedAddress: landmark?.formattedAddress || null,
            rating: null,
            userRatingCount: null,
            googleMapsURI: landmark?.googleMapsURI || null,
            reviews: [],
            isExactInstituteMatch: false,
          });
        }
      } catch (err) {
        if (isQuotaError(err)) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error:
              err instanceof Error
                ? err.message
                : 'Unable to load location details right now.',
          }));
        }
      }
    }

    lookupInstitute();

    return () => {
      cancelled = true;
    };
  }, [placesLib]);

  return state;
}
