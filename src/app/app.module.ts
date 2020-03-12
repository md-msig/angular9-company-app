//Modules Import Start
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { ToastrModule } from "ngx-toastr";
import { AgmCoreModule } from "@agm/core";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from './shared/auth/authconfig.interceptor';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StoreModule } from "@ngrx/store";

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';
//Modules Import End


//Components Import Start
import { AppComponent } from "./app.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { AuthComponent } from './auth/auth.component';
import { ComAddComponent } from './shared/modals/comadd/comadd.component';
import { ComEditComponent } from './shared/modals/comedit/comedit.component';
//Components Import End

//Services Import Start
import { DragulaService } from "ng2-dragula";
import { AuthService } from "./shared/auth/auth.service";
import { AuthGuard } from "./shared/auth/auth.guard";
import { ConfigService } from "./shared/services/config.service";
//Services Import End


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, AuthComponent],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({}),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: "YOUR KEY"
    }),
    PerfectScrollbarModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DragulaService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
