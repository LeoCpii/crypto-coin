import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { COLORS } from 'src/app/shared/constants/colors.const';
import { SafeValueService } from 'src/app/shared/services/safe-value.service';
import { CHART } from './monitor.const';
import { AgroupDetail } from './monitor.resolver';
import * as moment from 'moment';
import { SLIDE_Y_SIMPLE } from 'src/app/shared/animations/slide.animation';

export interface IMonitorPage {
    id: string;
    account: number;
    coins: AgroupDetail[];
    amountInvested: {
        usd: number;
        brl: number;
    },
    patrimony: {
        usd: number;
        brl: number;
    },
}

@Component({
    selector: 'app-monitor-page',
    templateUrl: './monitor.page.html',
    styleUrls: ['./monitor.page.scss'],
    animations: [LIST_ANIMATION_LATERAL, SLIDE_Y_SIMPLE]
})

export class MonitorPage implements OnInit {
    public data: IMonitorPage;
    public animate = 'ready';
    private state: boolean;
    private currency: 'brl' | 'usd' = 'brl';
    private states = {
        show: {
            label: 'Ocultar valores',
            icon: 'visibility_off',
        },
        hidden: {
            label: 'Exibir valores',
            icon: 'visibility',
        }
    }

    public chart;

    constructor(
        private safe: SafeValueService,
        private route: ActivatedRoute,
    ) { }

    get length(): string {
        return this.data.coins.length > 0 ? `${this.data.coins.length} moedas` : '1 moeda';
    }

    get amountInvested(): number {
        return this.data.amountInvested[this.currency];
    }

    get patrimony(): number {
        return this.data.patrimony[this.currency];
    }

    get account(): number {
        return this.data.account;
    }

    get button() {
        const state = this.state ? 'hidden' : 'show';
        return this.states[state];
    }

    get colors() {
        return COLORS;
    }

    get date() {
        return moment().format('DD/MM/YYYY');
    }

    public toogle() {
        this.state = !this.state;
        this.safe.setVisibility();
    }

    private getChart() {
        const labels = this.data.coins.map(coin => coin.name);
        const series = this.data.coins.map(coin => coin.total[this.currency]);
        this.chart = CHART(series, labels);
    }

    ngOnInit() {
        this.data = this.route.snapshot.data.data;
        console.log(this.data)
        this.getChart();
    }
}
