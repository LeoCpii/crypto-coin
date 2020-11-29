import { Component, OnInit } from '@angular/core';
import { SLIDE_X_L_TO_R } from 'src/app/shared/animations/slide.animation';

@Component({
    selector: 'app-dropdown-page',
    templateUrl: './dropdown.page.html',
    styleUrls: ['./dropdown.page.scss'],
    animations: [SLIDE_X_L_TO_R]
})

export class DropdownPage implements OnInit {
    public animate = 'ready';

    constructor() { }

    ngOnInit() { }
}
