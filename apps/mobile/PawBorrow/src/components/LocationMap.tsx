import { useEffect, useState } from 'react';

export interface StoreLocation {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

const FALLBACK: StoreLocation = {
  name: 'PawBorrow',
  address: 'Quezon City, Metro Manila, Philippines',
  lat: 14.676,
  lng: 121.0437,
};

export const useStoreLocation = () => {
  const [location, setLocation] = useState<StoreLocation>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/location`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data: StoreLocation = await res.json();
        setLocation(data);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.warn('Falling back to default location', err);
        }
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, []);

  return { location, loading };
};

const LocationMap = () => {
  const { location, loading } = useStoreLocation();
  const key = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  const src =
    `https://www.google.com/maps/embed/v1/place` +
    `?key=${key}` +
    `&q=${encodeURIComponent(location.address)}` +
    `&center=${location.lat},${location.lng}` +
    `&zoom=12`;

  return (
    <div className="about-map">
      {loading ? (
        <div className="about-map-skeleton" />
      ) : (
        <iframe
          title={`Map showing ${location.name}`}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default LocationMap;