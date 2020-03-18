import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from "rxjs/internal/operators";

import { AuthService } from "@shared/auth/auth.service";
import { ConfigService } from "@shared/services/config.service";

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
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
                // auto logout if 401 response returned from api
                this.authService.logout();
                location.reload(true);
            } 

            return throwError(err);
        }))
    }
}