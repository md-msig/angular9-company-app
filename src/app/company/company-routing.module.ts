import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyListComponent } from "./list/company-list.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: CompanyListComponent,
        data: {
          title: 'Company List'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule { }