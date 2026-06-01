import { PUBLIC_API_URL, PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';

export const config = {
  apiUrl: PUBLIC_API_URL,
  googleMapsApiKey: PUBLIC_GOOGLE_MAPS_API_KEY,
} as const;