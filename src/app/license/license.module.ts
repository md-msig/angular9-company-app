import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LicenseRoutingModule } from "./license-routing.module";

import { LicenseComponent } from "./license.component";
// import { ComViewComponent } from './../shared/modals/comview/comview.component';
import { LiAddComponent } from './../shared/modals/liadd/liadd.component';
import { LiEditComponent } from './../shared/modals/liedit/liedit.component';
import { MaterialModule } from './../material.module';

@NgModule({
    imports: [
        CommonModule,
        LicenseRoutingModule,
        NgxDatatableModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        LicenseComponent, LiAddComponent, LiEditComponent
    ],
    entryComponents: [LiAddComponent, LiEditComponent]
})
export class LicenseModule { }
