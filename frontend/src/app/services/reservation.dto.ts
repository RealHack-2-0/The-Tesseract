export interface Reservation {
  _id?: string;
  vehicle: string;
  requested: string;
  status: string;
  created: string;
  createdBy: string;
  accept?: boolean;
}
