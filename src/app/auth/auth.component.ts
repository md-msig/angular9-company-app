import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from "./../shared/auth/auth.service";
import { Router } from '@angular/router';
import { ConfigService } from './../shared/services/config.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public configService: ConfigService,
    private http: HttpClient,
    public router: Router
  ) { }
  loginForm: FormGroup;
  isSubmitted = false;

  isWelcome = true;
  message = this.configService.welcome_msg;

  host_url = this.configService.host_url;
  headers = this.configService.headers;

  
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() { return this.loginForm.controls; }

  loginUser() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.signIn(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('access_token', res.token);
        if ((typeof res == 'object') && (res['role'] == 'ROLE_ERPADMIN' || res['role'] == 'ROLE_ERPAUTHADMIN' || res['role'] == 'ROLE_ERPUSER')) {
            this.router.navigate(['company']);
        } else {
          this.message = this.configService.unauthorized_msg;
          this.isWelcome = false;
          this.router.navigate(['auth']);
        }
      },
      (err: any) => {
        this.message = this.configService.unauthorized_msg;
        this.isWelcome = false;
        this.router.navigate(['auth']);
      }
    )
  }

  // Company Groups
  getGroupCompanies(): Observable<any> {
    let api = this.host_url + '/companygroups';
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      })
    )
  }
}
