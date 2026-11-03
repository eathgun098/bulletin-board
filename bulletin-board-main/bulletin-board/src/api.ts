import type { AdItem, AdsResponse } from './types';

export const BASE_URL = 'https://inai-col1.fishrungames.com';

export async function fetchAds(): Promise<AdItem[]> {
  const response = await fetch(`${BASE_URL}/ads`);
  if (!response.ok) {
    throw new Error(`Ошибка загрузки объявлений: ${response.statusText}`);
  }
  const data: AdsResponse = await response.json();
  return data.items;
}

export async function createAd(formData: FormData): Promise<AdItem> {
  const response = await fetch(`${BASE_URL}/ads`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Ошибка отправки: ${response.statusText}`);
  }
  return response.json();
}

