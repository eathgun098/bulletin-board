export interface AdItem {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl?: string | null;
    image_url?: string | null;
}

export interface AdsResponse {
    items: AdItem[];
    total: number;
    page: number;
    limit: number;
}

