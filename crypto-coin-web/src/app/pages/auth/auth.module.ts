import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPage } from './login/login.page';
import { ForgotPage } from './forgot/forgot.page';
import { CreatePage } from './create/create.page';

const PAGES = [
    LoginPage,
    ForgotPage,
    CreatePage
];

@NgModule({
    imports: [
        AuthRoutingModule,
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [...PAGES],
})
export class AuthModule { }
