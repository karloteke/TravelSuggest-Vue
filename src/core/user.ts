export interface User{
    id: number
    userName: string
    email: string
    points: number
    role: string
}

export interface UserUpdate {
    userName: string;
    password?: string;
    email: string;
  }