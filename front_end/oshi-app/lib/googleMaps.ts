export const OSHI_MAP_STYLE: google.maps.MapTypeStyle[] = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#F4F5F0' }] // Soft beige background
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#2C3E2D' }]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#F4F5F0' }, { weight: 3 }]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#D3D6BB' }]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#7C8A79' }]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#EAEBE3' }]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#DFE2D8' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#3B5937' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#D5DEC9' }] // Lush park green-beige
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#FFFFFF' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4A5748' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#D6DEC6' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#BCC6AA' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#E2E6DA' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#C8D5C8' }] // Muted sage water
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#2C3E2D' }]
  }
];

let loadPromise: Promise<typeof google> | null = null;

export function loadGoogleMapsApi(): Promise<typeof google> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Maps API can only be loaded in browser environment'));
  }

  if (window.google && window.google.maps) {
    return Promise.resolve(window.google);
  }

  if (loadPromise) {
    return loadPromise;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  if (!apiKey) {
    return Promise.reject(
      new Error('Google Maps API key is missing. Please configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment.')
    );
  }

  loadPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById('google-maps-js-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.google?.maps) resolve(window.google);
      });
      existingScript.addEventListener('error', (e) => reject(e));
      if (window.google?.maps) resolve(window.google);
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-js-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker,geocoding&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && window.google.maps) {
        resolve(window.google);
      } else {
        reject(new Error('Google Maps script loaded but google.maps is undefined'));
      }
    };
    script.onerror = (err) => {
      reject(err);
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}
