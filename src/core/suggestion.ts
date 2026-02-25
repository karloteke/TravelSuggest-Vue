export interface Suggestion {
  id: number
  title: string
  description: string
  price: number
  rating: number
  created_at: string
  userId: number
  imageBase64: string | null
}

export interface SuggestionUpdate {
  title: string
  description: string
  price: number
  rating: number
  imageBase64: string | null
}

export interface SuggestionQueryParameters {
  minPrice?: number
  maxPrice?: number
  rating?: number
}
