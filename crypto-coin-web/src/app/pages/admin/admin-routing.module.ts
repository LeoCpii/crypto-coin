import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPage } from './admin.page';
import { AdminResolver } from './admin.resolver';
import { AportPage } from './aport/aport.page';
import { DetailPage } from './detail/detail.page';
import { DetailResolver } from './detail/detail.resolver';
import { InvestingPage } from './investing/investing.page';
import { MonitorPage } from './monitor/monitor.page';
import { MonitorResolver } from './monitor/monitor.resolver';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    resolve: { data: AdminResolver },
    children: [
      {
        path: '',
        redirectTo: 'monitor',
        pathMatch: 'full'
      },
      {
        path: 'monitor',
        component: MonitorPage,
        resolve: { data: MonitorResolver },
      },
      {
        path: 'investing',
        component: InvestingPage,
      },
      {
        path: 'aport',
        component: AportPage,
      },
      {
        path: 'detail/:id',
        component: DetailPage,
        resolve: { data: DetailResolver },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AdminRoutingModule { }
