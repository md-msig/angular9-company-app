import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "./../shared/auth/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  message = this.authService.message;

  ngOnInit(): void {
  }

  loginUser() {
    this.authService.signIn(this.loginForm.value)
  }

}
