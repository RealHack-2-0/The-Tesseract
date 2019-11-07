import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserUpdate } from './user.dto';
import { map, first, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../api/api.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // API Endpoints
  private currentUrl = AppConfig.apiUrl + '/users/current';

  constructor(private http: HttpClient, private _router: ActivatedRoute) {}

  current(): User {
    return JSON.parse(localStorage.getItem('current_user')) as User;
  }

  collectCurrent(): Observable<User> {
    return this.http.get(this.currentUrl).pipe(
      first(),
      map(res => res as User),
      tap(user => this.setUser(user))
    );
  }

  removeCurrent() {
    this.removeUser();
  }

  private setUser(response: User) {
    localStorage.setItem('current_user', JSON.stringify(response));
  }

  private removeUser() {
    localStorage.removeItem('current_user');
  }

  create(service: User): Observable<ApiResponse> {
    return this.http.post(this.currentUrl, service).pipe(
      first(),
      map(res => res as ApiResponse)
    );
  }

  update(serviceId: string, update: UserUpdate): Observable<ApiResponse> {
    return this.http.put(this.currentUrl + '/' + serviceId, update).pipe(
      first(),
      map(res => res as ApiResponse)
    );
  }

  getById(userId: string): Observable<User> {
    return this.http.get(this.currentUrl + '/' + userId).pipe(
      first(),
      map(res => res as User)
    );
  }

  //Test class to get current user
  getUser(user: User) {
    return this.http.get(this.currentUrl);
  }

  test() {
    console.log('GOT');
  }
}
