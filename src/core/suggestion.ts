
export interface Suggestion {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    created_at: string;
    userId: number;
}

export interface SuggestionUpdate {
    title: string
    description: string
    price: number
    rating: number
}

export interface SuggestionQueryParameters {
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
}
