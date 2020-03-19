import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { FullLayoutComponent } from "@app/layouts/full/full-layout.component";

import { Full_ROUTES } from "@shared/routes/full-layout.routes";

import { AuthGuard } from '@shared/auth/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  { path: 'auth', component: LoginComponent },
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  {
    path: '**',
    redirectTo: 'pages/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
export const RoutingComponent = [LoginComponent];
