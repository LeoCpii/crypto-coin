import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';

@Component({
    selector: 'app-aport-page',
    templateUrl: './aport.page.html',
    styleUrls: ['./aport.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class AportPage implements OnInit {
    public show: boolean;

    constructor() { }

    ngOnInit() {
        setTimeout(() => { this.show = true }, 0);
    }
}
