import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { PIPES, IPipeUsage } from './pipe.const';

@Component({
    selector: 'app-pipe-page',
    templateUrl: './pipe.page.html',
    styleUrls: ['./pipe.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class PipePage implements OnInit {
    public animate = 'ready';

    constructor() { }

    public get pipes(): IPipeUsage[] {
        return PIPES;
    }

    ngOnInit() { }
}
