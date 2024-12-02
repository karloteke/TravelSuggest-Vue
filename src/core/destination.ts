export interface Destination {
    id: number
    cityName: string
    description: string
    season: string
    isPopular: boolean
    category: string
    userId: number
    imageBase64: string | null
}

export interface DestinationUpdate {
    cityName: string
    description: string
    season: string
    isPopular: boolean
    category: string
    imageBase64: string | null
  }

export interface DestinationQueryParameters {
    cityName?: string;
    season?: string;
    category?: string;
    userId?: number;
    isPopular?: boolean;
  }

