import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Components
import { LinkComponent } from './link/link.component';
import { ToastyComponent } from './toasty/toasty.component';
import { ToastyListComponent } from './toasty/toasty-list/toasty-list.component';
import { ButtonComponent } from './button/button.component';
import { LoadingComponent } from './loading/loading.component';
import { ItemComponent } from './item/item.component';
import { FormLogComponent } from './form-log/form-log.component';
import { InputComponent } from './input/input.component';
import { PasswordRequirementsComponent } from './password-requirements/password-requirements.component';
import { PasswordRequirementsItemComponent } from './password-requirements/password-requirements-item/password-requirements-item.component';
import { AlertComponent } from './alert/alert.component';
import { LogoComponent } from './logo/logo.component';
import { TabsComponent } from './tabs/tabs.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ChartComponent } from './chart/chart.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DatePickerComponent } from './datepicker/datepicker.component';
import { ModalSmartComponent } from './modal-smart/modal-smart.component';
import { SkeletonLoadingComponent } from './skeleton-loading/skeleton-loading.component';
import { CardCoinComponent } from './card-coin/card-coin.component';
import { ModalPageComponent } from './modal-page/modal-page.component';
import { SocialComponent } from './social/social.component';
import { CollapsibleComponent } from './collapsible/collapsible.component';
import { SVGComponent } from './svg/svg.component';
import { ModalPayComponent } from './modal-pay/modal-pay.component';
import { FilterComponent } from './filter/filter.component';

// Services
import { PasswordRequirementsService } from './password-requirements/password-requirement.service';
import { CollapsibleService } from './collapsible/collapsible.service';
import { ModalService } from './modal-smart/modal-smart.service';

// Modules
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { CurrencyMaskModule, CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { MaterialModule } from './material.module';
import { NgxMaskModule } from 'ngx-mask';

const defaultSwiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
};

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.'
};

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
    SocialComponent,
    CollapsibleComponent,
    SVGComponent,
    ModalSmartComponent,
    DatePickerComponent,
    CarouselComponent,
    ModalPayComponent,
    FilterComponent
];

const PROVIDERS = [PasswordRequirementsService, CollapsibleService, ModalService,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule,
        NgxMaskModule.forRoot(),
        NgxSmartModalModule.forRoot(),
        NgApexchartsModule,
        SwiperModule,
        CurrencyMaskModule,
    ],
    exports: [
        ...COMPONENTS,
        MaterialModule,
        CurrencyMaskModule
    ],
    declarations: [...COMPONENTS],
    providers: [
        { provide: SWIPER_CONFIG, useValue: defaultSwiperConfig },
        ...PROVIDERS,
    ]
})

export class ComponentsModule { }
