import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  unauthorized_msg: string = 'Unauthorized User. Please contact administrator for access.';
  welcome_msg: string = 'Welcome, please login to your account.';
  expired_msg: string = 'Session expired. Please login again.';
  
  endpoint: string = 'http://ec2-3-7-8-26.ap-south-1.compute.amazonaws.com:8080';
  headers = new HttpHeaders({'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept', 'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Content-Type':'application/json', 'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0', 'X-Forwarded-For':'203.0.113.195'});
  // headers = new HttpHeaders({'Content-Type':'application/json', 'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0', 'X-Forwarded-For':'203.0.113.195'});
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = this.endpoint + "/register-user";
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: User) {
    this.router.navigate(['datatables/filter']);
    // let api = this.endpoint + "/auth";
    // return this.http.post(api, JSON.stringify(user),{headers: this.headers}).subscribe((res) => {
    //   console.log(res);
    // });
      // .subscribe((res) => {
      //   console.log(res);
      //   // localStorage.setItem('access_token', res.token)
      //   // this.getUserProfile(res._id).subscribe((res) => {
      //   //   this.currentUser = res;
      //   //   console.log(this.currentUser);
      //   //   this.router.navigate(['user-profile/' + res.msg._id]);
      //   // })
      // })
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

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
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