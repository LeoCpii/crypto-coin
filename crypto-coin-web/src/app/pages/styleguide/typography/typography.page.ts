import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { ITypes, TYPES } from './typography.const';

@Component({
    selector: 'app-typography-page',
    templateUrl: './typography.page.html',
    styleUrls: ['./typography.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class TypohraphyPage implements OnInit {
    public show: boolean;

    constructor() { }

    public get types(): ITypes[] {
        return TYPES;
    }

    public getClass(name: string): string {
        return name;
    }

    ngOnInit() {
        setTimeout(() => { this.show = true; }, 0);
    }
}
