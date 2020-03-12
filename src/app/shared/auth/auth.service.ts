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
  unauthorized_msg: string = 'Unauthorized User. Please contact administrator for access.';
  welcome_msg: string = 'Welcome, please login to your account.';
  expired_msg: string = 'Session expired. Please login again.';
  message: string = this.welcome_msg;
  headers = this.configservice.headers;
  host_url: string = this.configservice.host_url;
  
  currentUser = {};

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = this.host_url + "/register-user";
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: User) {
    let api = this.host_url + '/auth';
    return this.http.post(api, JSON.stringify(user), {headers: this.headers})
      .subscribe(
        (res: any) => {
          localStorage.setItem('access_token', res.token);
          if((typeof res == 'object') && (res['role']=='ROLE_ERPADMIN' || res['role']=='ROLE_ERPAUTHADMIN' || res['role']=='ROLE_ERPUSER')){
            this.getGroupCompanies().subscribe((res) => {
              this.configservice.company_data = res;
              this.router.navigate(['company/list']);
            })
          }else {
          }
        },
        (err) => {
          if((err.status == '403') && (typeof err.error == 'string' && err.error == 'Invalid Username or Password.')){
          }          
        }
      )
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // Company Groups
  getGroupCompanies(): Observable<any> {
    let api = this.host_url + '/companygroups';
    this.headers = this.headers.append('Authorization', 'Bearer ' + this.getToken());
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}