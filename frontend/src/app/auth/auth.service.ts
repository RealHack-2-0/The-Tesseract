import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config';
import { tap, shareReplay, flatMap, map } from 'rxjs/operators';
import * as moment from 'moment';
import { SignInResponse, SignInRequest, SignUpRequest } from './auth.dto';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ApiResponse } from '../api/api.dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // API Endpoints
  private signInUrl = AppConfig.apiUrl + '/auth/signin';
  private signUpUrl = AppConfig.apiUrl + '/auth/signup';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private _router: Router
  ) { }

  isAuthorized() {
    return moment().isBefore(this.getExpiration());
  }

  signUp(request: SignUpRequest) {
    return this.http.post(this.signUpUrl, request).pipe(
      map(res => res as ApiResponse)
    );
  }

  signIn(request: SignInRequest) {
    return this.http.post(this.signInUrl, request).pipe(
      tap(res => this.setSession(res as SignInResponse)),
      shareReplay(),
      flatMap(() => this.userService.collectCurrent())
    );
  }

  signOut() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userService.removeCurrent();
  }

  private setSession(response: SignInResponse) {
    const expiresAt = moment().add(response.expiresIn, 'second');

    localStorage.setItem('jwt_token', response.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
