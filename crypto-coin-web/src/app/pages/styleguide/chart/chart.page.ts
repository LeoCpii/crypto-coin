import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { CHART, DONUT } from './chart.const';

@Component({
    selector: 'app-chart-page',
    templateUrl: './chart.page.html',
    styleUrls: ['./chart.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class ChartPage implements OnInit {
    public show: boolean;

    constructor() { }

    get chart() {
        return CHART;
    }

    get donut() {
        return DONUT;
    }

    ngOnInit() {
        setTimeout(() => { this.show = true }, 0);
    }
}
