import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { MonitorPage } from './monitor/monitor.page';
import { AdminPage } from './admin.page';
import { InvestingPage } from './investing/investing.page';
import { AportPage } from './aport/aport.page';
import { DetailPage } from './detail/detail.page';

const PAGES = [
    AdminPage,
    MonitorPage,
    InvestingPage,
    AportPage,
    DetailPage
];

@NgModule({
    imports: [
        AdminRoutingModule,
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [...PAGES],
})
export class AdminModule { }
