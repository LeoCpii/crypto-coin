import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { IItems, ITEMS } from './item.const';

@Component({
    selector: 'app-item-page',
    templateUrl: './item.page.html',
    styleUrls: ['./item.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class ItemPage implements OnInit {
    public show: boolean;

    constructor() { }

    public get items(): IItems[] {
        return ITEMS;
    }

    ngOnInit() {
        setTimeout(() => { this.show = true }, 0);
    }
}
