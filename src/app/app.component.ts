import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ConfigService } from "./shared/services/config.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    page_title: string;

    constructor(private router: Router, public configservice: ConfigService) {
        this.page_title = this.configservice.page_title;
    }

    ngOnInit() {
        this.subscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => window.scrollTo(0, 0));
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}