import { Title } from "@angular/platform-browser";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "@shared/auth/auth.service";
import { ConfigService } from '@shared/services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public configService: ConfigService,
    private http: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.configService.page_titles.login);
  }
  loginForm: FormGroup;
  isSubmitted = false;
  loading = false;
  returnUrl: string;
  error = this.configService.error;
  message = this.configService.login_message;

  host_url = this.configService.host_url;
  headers = this.configService.headers;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'company';
  }

  get formControls() { return this.loginForm.controls; }

  loginUser() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.signIn(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error.error;
          this.message = this.configService.unauthorized_msg;
          this.loading = false;
        });
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
