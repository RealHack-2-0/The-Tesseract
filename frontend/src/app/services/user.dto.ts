export interface User {
  _id?: string;
  firstname: string;
  lastname: string;
  username: string;
  isAdmin?: boolean;
  email?: string;
  tel?: string;
  address?: string;
}

export interface UserUpdate {
  _id?: string;
  firstname: string;
  lastname: string;
  username: string;
  isAdmin?: boolean;
  email?: string;
  tel?: string;
  address?: string;
}
