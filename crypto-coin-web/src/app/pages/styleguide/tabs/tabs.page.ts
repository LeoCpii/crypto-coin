import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { SECTION, ISection } from './tabs.const';

@Component({
    selector: 'app-tabs-page',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class TabsPage implements OnInit {
    public show: boolean;

    constructor() { }

    get tabs() {
        const teste = [
            { label: 'Tab 1', route: 'tab1' },
            { label: 'Tab 2', route: 'tab2' },
            { label: 'Tab 3', route: 'tab3' },
            { label: 'Tab 4', route: 'tab4' },
          ];
        return teste;
    }

    ngOnInit() {
        setTimeout(() => { this.show = true }, 0);
    }
}
