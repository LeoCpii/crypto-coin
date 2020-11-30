import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { NgxMaskModule } from 'ngx-mask';
import { LinkComponent } from './link/link.component';
import { ToastyComponent } from './toasty/toasty.component';
import { ToastyListComponent } from './toasty/toasty-list/toasty-list.component';
import { ButtonComponent } from './button/button.component';
import { LoadingComponent } from './loading/loading.component';
import { ItemComponent } from './item/item.component';
import { FormLogComponent } from './form-log/form-log.component';
import { InputComponent } from './input/input.component';

// Service
import { PasswordRequirementsService } from './password-requirements/password-requirement.service';
import { PasswordRequirementsComponent } from './password-requirements/password-requirements.component';
import { PasswordRequirementsItemComponent } from './password-requirements/password-requirements-item/password-requirements-item.component';
import { AlertComponent } from './alert/alert.component';
import { LogoComponent } from './logo/logo.component';
import { TabsComponent } from './tabs/tabs.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ChartComponent } from './chart/chart.component';

// Modules
import { NgApexchartsModule } from 'ng-apexcharts';
import { SkeletonLoadingComponent } from './skeleton-loading/skeleton-loading.component';
import { CardCoinComponent } from './card-coin/card-coin.component';
import { ModalPageComponent } from './modal-page/modal-page.component';
import { SocialComponent } from './social/social.component';

const COMPONENTS = [
    LinkComponent,
    ToastyComponent,
    ToastyListComponent,
    ButtonComponent,
    LoadingComponent,
    ItemComponent,
    FormLogComponent,
    InputComponent,
    PasswordRequirementsComponent,
    PasswordRequirementsItemComponent,
    AlertComponent,
    LogoComponent,
    TabsComponent,
    AvatarComponent,
    ChartComponent,
    SkeletonLoadingComponent,
    CardCoinComponent,
    ModalPageComponent,
    SocialComponent
];

const PROVIDERS = [PasswordRequirementsService];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule,
        NgxMaskModule.forRoot(),
        NgApexchartsModule,
    ],
    exports: [
        ...COMPONENTS,
        MaterialModule
    ],
    declarations: [...COMPONENTS],
    providers: [...PROVIDERS,]
})

export class ComponentsModule { }
