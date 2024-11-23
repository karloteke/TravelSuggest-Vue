export interface Destination {
    id: number
    cityName: string
    description: string
    season: string
    isPopular: boolean
    category: string
    userId: number
}

export interface DestinationUpdate {
    cityName: string
    description: string
    season: string
    isPopular: boolean
    category: string
  }

export interface DestinationQueryParameters {
    cityName?: string;
    season?: string;
    category?: string;
    userId?: number;
    isPopular?: boolean;
  }

