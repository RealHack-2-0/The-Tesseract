import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car, CarUpdate } from './car.dto';
import { first, map } from 'rxjs/operators';
import { ApiResponse } from '../api/api.dto';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  // API Endpoints
  private carsUrl = AppConfig.apiUrl + '/cars';

  constructor(private http: HttpClient) {}

  get(): Observable<Car[]> {
    return this.http.get(this.carsUrl).pipe(
      first(),
      map((res: any[]) => res.map(it => it as Car))
    );
  }

  getById(carId: string): Observable<Car> {
    return this.http.get(this.carsUrl + '/' + carId).pipe(
      first(),
      map(res => res as Car)
    );
  }

  create(car: Car): Observable<ApiResponse> {
    return this.http.post(this.carsUrl, car).pipe(
      first(),
      map(res => res as ApiResponse)
    );
  }

  update(carId: string, update: CarUpdate): Observable<ApiResponse> {
    return this.http.put(this.carsUrl + '/' + carId, update).pipe(
      first(),
      map(res => res as ApiResponse)
    );
  }

  delete(carId: string): Observable<ApiResponse> {
    return this.http.delete(this.carsUrl + '/' + carId).pipe(
      first(),
      map(res => res as ApiResponse)
    );
  }
}
