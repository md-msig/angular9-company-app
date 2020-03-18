import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CompanyRoutingModule } from "@app/company/company-routing.module";

import { CompanyComponent } from "@app/company/company.component";
import { ComViewComponent } from '@shared/modals/comview/comview.component';
import { ComAddComponent } from '@shared/modals/comadd/comadd.component';
import { ComEditComponent } from '@shared/modals/comedit/comedit.component';
import { MaterialModule } from '@app/material.module';

@NgModule({
    imports: [
        CommonModule,
        CompanyRoutingModule,
        NgxDatatableModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        CompanyComponent, ComViewComponent, ComAddComponent, ComEditComponent
    ],
    entryComponents: [ComViewComponent, ComAddComponent, ComEditComponent]
})
export class CompanyModule { }
