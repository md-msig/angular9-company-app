import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'company',
    loadChildren: () => import('../../company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'license',
    loadChildren: () => import('../../license/license.module').then(m => m.LicenseModule)
  }
];
