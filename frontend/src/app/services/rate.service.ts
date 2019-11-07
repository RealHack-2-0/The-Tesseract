import { Injectable } from '@angular/core';
import { Rate } from './rate.dto';
import { AppConfig } from '../app-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../api/api.dto';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private rateUrl = AppConfig.apiUrl + '/rating';

  constructor(private http: HttpClient) {}

  create(rate: Rate): Observable<ApiResponse> {
    return this.http.post(this.rateUrl, rate).pipe(
      first(),
      map(res => res as ApiResponse)
    );
  }

  get(): Observable<Rate[]> {
    return this.http.get(this.rateUrl + '/all').pipe(
      first(),
      map((res: any[]) => res.map(it => it as Rate))
    );
  }
}
