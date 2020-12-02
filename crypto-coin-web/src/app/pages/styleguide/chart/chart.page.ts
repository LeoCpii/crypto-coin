import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { CHART, DONUT, LINE } from './chart.const';

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

    get line() {
        return LINE;
    }

    ngOnInit() {
        setTimeout(() => { this.show = true }, 0);
    }
}
