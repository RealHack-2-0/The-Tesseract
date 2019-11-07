import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service, ServiceUpdate } from './service.dto';
import { first, map } from 'rxjs/operators';
import { ApiResponse } from '../api/api.dto';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // API Endpoints
  private servicesUrl = AppConfig.apiUrl + '/services';

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Service[]> {
    return this.http.get(this.servicesUrl).pipe(
      first(),
      map((res: any[]) => res.map(it => it as Service))
    );
  }

  getById(serviceId: string): Observable<Service> {
    return this.http.get(this.servicesUrl + '/' + serviceId).pipe(
      first(),
      map(res => res as Service)
    );
  }

  create(service: Service): Observable<ApiResponse> {
    return this.http.post(this.servicesUrl, service).pipe(
      first(),
      map(res => res as ApiResponse)
    );
  }

  update(serviceId: string, update: ServiceUpdate): Observable<ApiResponse> {
    return this.http.put(this.servicesUrl + '/' + serviceId, update).pipe(
      first(),
      map(res => res as ApiResponse)
    );
  }

  delete(serviceId: string): Observable<ApiResponse> {
    return this.http.delete(this.servicesUrl + '/' + serviceId).pipe(
      first(),
      map(res => res as ApiResponse)
    );
  }
}
