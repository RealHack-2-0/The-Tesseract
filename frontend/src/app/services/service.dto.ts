export interface Service {
  _id?: string;
  name: string;
  description: string;
  price?: string;
}

export interface ServiceUpdate {
  name?: string;
  description?: string;
  price?: string;
}
