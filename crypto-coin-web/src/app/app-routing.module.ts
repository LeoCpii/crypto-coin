import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'styleguide', pathMatch: 'full' },
  { path: 'styleguide', loadChildren: () => import('./pages/styleguide/styleguide.module').then(m => m.StyleguideModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
