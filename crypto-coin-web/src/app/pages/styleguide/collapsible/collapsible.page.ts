import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';

@Component({
    selector: 'app-collapsible-page',
    templateUrl: './collapsible.page.html',
    styleUrls: ['./collapsible.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class CollapsiblePage implements OnInit {
    public show: boolean;

    constructor() { }

    ngOnInit() {
        setTimeout(() => { this.show = true }, 0);
    }
}
