import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvancedFilterPage } from './advanced-filter/advanced-filter.page';
import { ButtonPage } from './button/button.page';
import { ChartPage } from './chart/chart.page';
import { CollapsiblePage } from './collapsible/collapsible.page';
import { ColorPage } from './color/color.page';
import { DropdownPage } from './dropdown/dropdown.page';
import { FormPage } from './form/form.page';
import { IconPage } from './icon/icon.page';
import { ItemPage } from './item/item.page';
import { PipePage } from './pipe/pipe.page';
import { SafeValuePage } from './safe-value/safe-value.page';
import { StyleguidePage } from './styleguide.page';
import { TabsPage } from './tabs/tabs.page';
import { TypohraphyPage } from './typography/typography.page';

const routes: Routes = [
  {
    path: '',
    component: StyleguidePage,
    data: { title: 'Styleguide' },
    children: [
      {
        path: '',
        redirectTo: 'typography',
        pathMatch: 'full'
      },
      {
        path: 'typography',
        component: TypohraphyPage,
        data: { title: 'typography' }
      },
      {
        path: 'color',
        component: ColorPage,
        data: { title: 'color' }
      },
      {
        path: 'button',
        component: ButtonPage,
        data: { title: 'button' }
      },
      {
        path: 'form',
        component: FormPage,
        data: { title: 'form' }
      },
      {
        path: 'item',
        component: ItemPage,
        data: { title: 'item' }
      },
      {
        path: 'pipe',
        component: PipePage,
        data: { title: 'pipe' }
      },
      {
        path: 'icon',
        component: IconPage,
        data: { title: 'icon' }
      },
      {
        path: 'advanced-filter',
        component: AdvancedFilterPage,
        data: { title: 'advanced-filter' }
      },
      {
        path: 'dropdown',
        component: DropdownPage,
        data: { title: 'dropdown' }
      },
      {
        path: 'safe-value',
        component: SafeValuePage,
        data: { title: 'dropdown' }
      },
      {
        path: 'collapsible',
        component: CollapsiblePage,
        data: { title: 'collapsible' }
      },
      {
        path: 'tabs',
        component: TabsPage,
        data: { title: 'tabs' }
      },
      {
        path: 'charts',
        component: ChartPage,
        data: { title: 'tabs' }
      }       
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class StyleguideRoutingModule { }
