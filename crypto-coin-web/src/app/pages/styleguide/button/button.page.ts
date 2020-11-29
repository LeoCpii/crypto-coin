import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { SECTION, ISection } from './button.const';

@Component({
    selector: 'app-button-page',
    templateUrl: './button.page.html',
    styleUrls: ['./button.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class ButtonPage implements OnInit {
    public show: boolean;

    constructor() { }

    get sections(): ISection[] {
        return SECTION;
    }

    ngOnInit() {
        setTimeout(() => { this.show = true }, 0);
    }
}
