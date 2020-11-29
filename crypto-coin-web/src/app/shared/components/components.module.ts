import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { LinkComponent } from './link/link.component';
import { ToastyComponent } from './toasty/toasty.component';
import { ToastyListComponent } from './toasty/toasty-list/toasty-list.component';
import { ButtonComponent } from './button/button.component';
import { LoadingComponent } from './loading/loading.component';
import { ItemComponent } from './item/item.component';

const COMPONENTS = [
    LinkComponent,
    ToastyComponent,
    ToastyListComponent,
    ButtonComponent,
    LoadingComponent,
    ItemComponent
];

const PROVIDERS = [];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule,
    ],
    exports: [...COMPONENTS,],
    declarations: [...COMPONENTS],
    providers: [...PROVIDERS,]
})

export class ComponentsModule { }
