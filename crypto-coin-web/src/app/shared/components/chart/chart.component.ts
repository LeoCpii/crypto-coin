import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';

export interface IApexChart extends ApexOptions { };

@Component({
    selector: 'app-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})

export class ChartComponent implements OnInit {

    @Input() data: IApexChart;

    constructor() { }

    ngOnInit() { }
}
