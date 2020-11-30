import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StyleguideRoutingModule } from './styleguide-routing.module';
import { StyleguidePage } from './styleguide.page';
import { TypohraphyPage } from './typography/typography.page';
import { ColorPage } from './color/color.page';
import { ButtonPage } from './button/button.page';
import { FormPage } from './form/form.page';
import { ItemPage } from './item/item.page';
import { PipePage } from './pipe/pipe.page';
import { IconPage } from './icon/icon.page';
import { AdvancedFilterPage } from './advanced-filter/advanced-filter.page';
import { DropdownPage } from './dropdown/dropdown.page';
import { SafeValuePage } from './safe-value/safe-value.page';
import { CollapsiblePage } from './collapsible/collapsible.page';
import { TabsPage } from './tabs/tabs.page';
import { ChartPage } from './chart/chart.page';

const PAGES = [
    StyleguidePage,
    TypohraphyPage,
    ColorPage,
    ButtonPage,
    FormPage,
    ItemPage,
    PipePage,
    IconPage,
    AdvancedFilterPage,
    DropdownPage,
    SafeValuePage,
    CollapsiblePage,
    TabsPage,
    ChartPage
];

@NgModule({
    imports: [
        StyleguideRoutingModule,
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ...PAGES
    ],
})
export class StyleguideModule { }
