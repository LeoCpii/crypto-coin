import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorRoutingModule } from './error-routing.module';
import { NotFoundPage } from './404/not-found.page';
import { InternalErrorPage } from './500/internal-error.page';

const PAGES = [
    NotFoundPage,
    InternalErrorPage
];

@NgModule({
    imports: [
        ErrorRoutingModule,
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [...PAGES],
})
export class ErrorModule { }
