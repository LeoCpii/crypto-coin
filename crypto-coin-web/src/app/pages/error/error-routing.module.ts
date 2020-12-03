import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPage } from './404/not-found.page';
import { InternalErrorPage } from './500/internal-error.page';
const routes: Routes = [
  {
    path: '',
    redirectTo: '404',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: NotFoundPage,
  },
  {
    path: '500',
    component: InternalErrorPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class ErrorRoutingModule { }
