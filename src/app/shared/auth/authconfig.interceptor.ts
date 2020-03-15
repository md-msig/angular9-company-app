import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Router } from "@angular/router";
import { catchError } from "rxjs/internal/operators";
import { AuthService } from "./auth.service";
import { ConfigService } from "./../../shared/services/config.service";
import { AuthComponent } from "./../../auth/auth.component";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
        private router: Router
    ) { }

    /**
    * intercept all XHR request
    * @param request
    * @param next
    * @returns {Observable<A>}
    */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getToken();
        let auth_url = this.configService.host_url + '/auth';
        if (req.url != auth_url) {
            req = req.clone({
                setHeaders: {
                    Authorization: "Bearer " + authToken
                }
            });
        }
        return next.handle(req).pipe(catchError((error, caught) => {
            //intercept the respons error and displace it to the console
            this.handleError(error);
            return of(error);
        }) as any);
    }

    /**
    * manage errors
    * @param error
    * @returns {any}
    */
    private handleError(error: HttpErrorResponse): Observable<any> {
        throw error;
    }
}