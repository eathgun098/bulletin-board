import type { AdItem, AdsResponse } from './types';

export const BASE_URL = 'https://fishrungames.com';

export async function fetchAds(): Promise<AdItem[]> {
  const response = await fetch(`${BASE_URL}/ads`);
  if (!response.ok) {
    throw new Error(`Ошибка загрузки объявлений: ${response.statusText}`);
  }
  const data: AdsResponse = await response.json();
  
  // ФИЛЬТР: Пишем ваше имя или ключевое слово, по которому сайт узнает ваши объявления.
  // Сайт будет искать это слово в описании товара.
  const MY_SECRET_KEYWORD = "от eathgun098"; 

  // Оставляем только те карточки, в описании которых есть ваше ключевое слово
  const myPersonalAds = data.items.filter(item => {
    if (!item.description) return false;
    return item.description.toLowerCase().includes(MY_SECRET_KEYWORD.toLowerCase());
  });

  return myPersonalAds;
}

export async function createAd(formData: FormData): Promise<AdItem> {
  // Автоматически добавляем вашу подпись в описание при создании нового объявления,
  // чтобы фильтр выше сразу его распознал и не удалил
  const originalDescription = formData.get('description') as string || '';
  formData.set('description', `${originalDescription} (от eathgun098)`);

  const response = await fetch(`${BASE_URL}/ads`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Ошибка отправки: ${response.statusText}`);
  }
  return response.json();
}
