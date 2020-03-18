import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from "@shared/auth/auth.service";
import { ConfigService } from "@shared/services/config.service";

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
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
        const authToken = this.authService.getToken();
        let auth_url = this.configService.host_url + '/auth';
        if (req.url != auth_url) {
            req = req.clone({
                setHeaders: {
                    Authorization: "Bearer " + authToken
                }
            });
        }

        return next.handle(req);
    }
}