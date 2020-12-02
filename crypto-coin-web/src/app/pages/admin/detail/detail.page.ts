import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { BrokerService } from 'src/app/shared/services/broker.service';
import { IApexChart } from 'src/app/shared/components/chart/chart.component';
import { AREA } from './detail.const';
import * as moment from 'moment';
import { WindowService } from 'src/app/shared/services/window.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { IModalPay } from 'src/app/shared/components/modal-pay/modal-pay.component';
import { ModalService } from 'src/app/shared/components/modal-smart/modal-smart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MonitorService } from 'src/app/shared/services/monitor.service';

export interface IDetailPage extends ICoinDetailFull { }

@Component({
    selector: 'app-detail-page',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class DetailPage implements OnInit {
    public data: IDetailPage;
    public chart: IApexChart;
    public chartVolume: IApexChart;
    public loading: boolean;
    public hasMobile = false;
    public sub: Subscription;
    public modalLoading = true;
    public dataModal: IModalPay;
    public account: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private broker: BrokerService,
        private user: UserService,
        private modal: ModalService,
        private snackBar: MatSnackBar,
        private monitor: MonitorService,
        private window: WindowService
    ) { this.hasMobile = window.hasMobile; }

    get showTwitter() {
        return !!this.data.links.twitter;
    }

    get showFacebook() {
        return !!this.data.links.facebook;
    }

    get showReddit() {
        return !!this.data.links.reddit;
    }

    public openModal(): void {
        this.modal.open('modal-pay');

        this.dataModal = {
            id: this.data.id,
            image: this.data.image.large,
            name: this.data.name,
            symbol: this.data.symbol,
            price: this.data.market_data.price.brl,
            account: this.account,
        }

        setTimeout(() => { this.modalLoading = false; }, 500);
    }

    private closeModal(): void {
        this.modal.close('modal-pay');
    }

    public close() {
        this.router.navigate(['admin', 'investing']);
    }

    public goReddit() {
        const w = window.open();
        w.location.href = this.data.links.reddit;
    }

    public goFacebook() {
        const w = window.open();
        w.location.href = `https://web.facebook.com/${this.data.links.facebook}/`;;
    }

    public goTwitter() {
        const w = window.open();
        w.location.href = `https://twitter.com/${this.data.links.twitter}`;
    }

    public goGithub() {
        const w = window.open();
        w.location.href = this.data.links.github;
    }

    private async setWallet() {
        const wallet = await this.monitor.wallet();
        this.account = wallet.account;
    }

    public pay(data: IPay) {
        this.modalLoading = true;

        this.user.addCoin(data)
            .then(response => {
                this.snackBar.open(response.message, '', {
                    duration: 2000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
                this.setWallet()
            })
            .catch(erro => console.log(erro))
            .finally(() => setTimeout(() => {
                this.modalLoading = false;
                this.closeModal();
            }, 500))
    }

    private async getChart() {
        this.loading = true;

        const from = moment().subtract(1, 'day').unix();
        const to = moment().unix();

        const market = await this.broker.marketChart(this.data.id, from, to);

        this.chart = AREA(market.prices, 'Preço')
        this.chartVolume = AREA(market.total_volumes, 'Volume');

        setTimeout(() => {
            this.loading = false;
        }, 500);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    async ngOnInit() {
        this.data = this.route.snapshot.data.data;
        await this.getChart();
        await this.setWallet();
        this.sub = this.window.change.subscribe((hasMobile: boolean) => this.hasMobile = hasMobile);
    }
}
