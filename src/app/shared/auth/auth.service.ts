import { Injectable } from '@angular/core';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/services/config.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    public router: Router,
    public configservice: ConfigService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  headers = this.configservice.headers;
  host_url = this.configservice.host_url;
  group_id = this.configservice.group_id;

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  // Sign-in
  signIn(user: User) {
    user['username'] += this.configservice.group_id;
    let api = this.host_url + '/auth';
    return this.http.post<any>(api, JSON.stringify(user), { headers: this.headers })
      .pipe(map(res => {
        // console.log(res.role);
        // return;
        if (res.role == 'ROLE_ERPADMIN' || res.role == 'ROLE_ERPAUTHADMIN' || res.role == 'ROLE_ERPUSER') {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(res);
          return res;
        }
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }
}