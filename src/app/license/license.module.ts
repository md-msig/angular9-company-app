import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LicenseRoutingModule } from "@app/license/license-routing.module";

import { LicenseComponent } from "@app/license/license.component";
import { LiAddComponent } from '@shared/modals/liadd/liadd.component';
import { LiEditComponent } from '@shared/modals/liedit/liedit.component';
import { MaterialModule } from '@app/material.module';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";

@NgModule({
    imports: [
        CommonModule,
        LicenseRoutingModule,
        NgxDatatableModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        DateTimePickerModule,
    ],
    declarations: [
        LicenseComponent, LiAddComponent, LiEditComponent
    ],
    entryComponents: [LiAddComponent, LiEditComponent]
})
export class LicenseModule { }
