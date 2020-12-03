import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';;
import { IApexChart } from 'src/app/shared/components/chart/chart.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { BrokerService } from 'src/app/shared/services/broker.service';
import { UserService } from 'src/app/shared/services/user.service';
import * as moment from 'moment';
import { AREA_FAVORITES } from '../../monitor.const';
import { FormControl, FormGroup } from '@angular/forms';
import { WindowService } from 'src/app/shared/services/window.service';
import { Subscription } from 'rxjs';

export interface IButtonChart {
    label: string;
    value: number;
    state: boolean;
}

@Component({
    selector: 'app-chart-fragment',
    templateUrl: './chart.fragment.html',
    styleUrls: ['./chart.fragment.scss'],
})

export class ChartFragment implements OnInit, OnDestroy {
    @Input() data: IApexChart;
    @Input() title: string;
    @Input() loading = true;
    @Input() prop: 'prices' | 'total_volumes';

    @Output() setLoading = new EventEmitter<boolean>();

    public timeout: NodeJS.Timeout;
    public hasMobile = false;
    public sub: Subscription;
    public formSub: Subscription;

    public buttons: IButtonChart[] = [
        {
            label: '24h',
            value: 1,
            state: true
        },
        {
            label: '7d',
            value: 7,
            state: false
        }
    ]

    public form = new FormGroup({
        from: new FormControl(''),
        to: new FormControl(''),
    });

    constructor(
        private broker: BrokerService,
        private userService: UserService,
        private local: LocalStorageService,
        private window: WindowService
    ) { this.hasMobile = window.hasMobile; }

    get favorites() {
        return this.local.getJson<IUser>('user').favorites;
    }

    get hasFilter() {
        return this.buttons.some(button => button.state);
    }

    public async change(from: string, to: string) {
        if (from && to) {
            this.resetButtons();

            const fromUnix = moment(from).unix();
            const toUnix = moment(to).unix();

            await this.getChart(fromUnix, toUnix);
        }
    }

    public async toggle(index: number) {
        this.buttons.forEach((button: IButtonChart, i: number) => {
            if (index === i) { button.state = true }
            else { button.state = false };
        });

        const value = this.buttons.find(button => button.state).value;

        const params = this.getInterval(value);
        this.form.reset();
        await this.getChart(params.from, params.to);
    }

    private resetButtons() {
        this.buttons.forEach(button => button.state = false);
    }

    private getInterval(interval: number) {
        const from = moment().subtract(interval, 'day').unix();
        const to = moment().unix();

        return { from, to };
    }

    private async setChart() {
        const params = this.getInterval(1);
        await this.getChart(params.from, params.to);
    }

    private async getChart(from: number, to: number) {
        this.setLoading.emit(true);

        const series = await Promise.all(this.favorites.map(async favorite => {
            const data = await this.broker.marketChart(favorite.id, from, to);

            return {
                name: favorite.name,
                data: data[this.prop]
            }
        }));

        this.data = AREA_FAVORITES(series);
        this.setLoading.emit(false);
    }

    ngOnDestroy() {
        if (this.formSub) { this.formSub.unsubscribe(); }
        if (this.sub) { this.sub.unsubscribe(); }
    }

    async ngOnInit() {
        await this.setChart();

        this.formSub = this.form.valueChanges.subscribe(async form => {
            const from = form.from;
            const to = form.to;

            clearTimeout(this.timeout);

            this.timeout = setTimeout(async () => {
                await this.change(from, to);
            }, 500);
        })

        this.sub = this.window.change.subscribe((hasMobile: boolean) => this.hasMobile = hasMobile);
    }
}
