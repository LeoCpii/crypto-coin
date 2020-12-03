import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPage } from './pages/error/404/not-found.page';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'styleguide', loadChildren: () => import('./pages/styleguide/styleguide.module').then(m => m.StyleguideModule) },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'error', loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorModule) },
  { path: 'error', loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorModule) },
  { path: '**', component: NotFoundPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
