export interface Car {
  _id?: string;
  model: string;
  vendor: string;
  number: string;
  milage?: number;
  ownerId?: string;
}

export interface CarUpdate {
  model?: string;
  vendor?: string;
  number?: string;
  milage?: number;
}
