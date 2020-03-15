import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from '../services/config.service';
// import { AuthComponent } from './../../auth/auth.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private http: HttpClient,
    public router: Router,
    // public authcomponent: AuthComponent
    public configservice: ConfigService
  ) {
  }

  headers = this.configservice.headers;
  host_url = this.configservice.host_url;
  group_id = this.configservice.group_id;

  // Sign-in
  signIn(user: User) {
    user['username'] += this.configservice.group_id;
    let api = this.host_url + '/auth';
    return this.http.post(api, JSON.stringify(user), { headers: this.headers })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }
}