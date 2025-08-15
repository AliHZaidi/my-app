import { DisabilityData } from '@/types/accommodations';

export async function loadDisabilityData(): Promise<DisabilityData[]> {
  const response = await fetch('http://localhost:3000/api/disabilities', {
    next: {
      revalidate: 3600, // Cache for 1 hour
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch disabilities data');
  }

  return response.json();
}