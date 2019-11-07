import { Reservation } from './reservation.dto';
import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ApiResponse } from '../api/api.dto';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  private reservationUrl = AppConfig.apiUrl + '/reservations';

  get(): Observable<Reservation[]> {
    return this.http.get(this.reservationUrl + '/all').pipe(
      first(),
      map((res: any[]) => res.map(it => it as Reservation))
    );
  }
}
