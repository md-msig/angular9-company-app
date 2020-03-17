import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicenseComponent } from "./license.component";

const routes: Routes = [
  {
    path: '',
    component: LicenseComponent,
    data: {
      title: 'Module Licenses'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicenseRoutingModule { }