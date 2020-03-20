import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from "rxjs/internal/operators";
import { Router } from '@angular/router';

import { AuthService } from "@shared/auth/auth.service";
import { ConfigService } from "@shared/services/config.service";

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
        public router: Router,
    ) { }

    /**
    * intercept all XHR request
    * @param request
    * @param next
    * @returns {Observable<A>}
    */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if (err.status === 401) {
                this.configService.error = err.status;
                this.configService.login_message = this.configService.unauthorized_msg;
                this.router.navigate(['auth']);
            } else if (err.status === 403) {
                this.configService.error = err.status;
                this.configService.login_message = err.error.message;
                this.router.navigate(['auth']);
            }

            return throwError(err);
        }))
    }
}