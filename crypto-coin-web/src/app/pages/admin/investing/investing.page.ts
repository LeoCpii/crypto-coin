import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { SLIDE_Y_SIMPLE } from 'src/app/shared/animations/slide.animation';
import { ModalService } from 'src/app/shared/components/modal-smart/modal-smart.service';
import { BrokerService } from 'src/app/shared/services/broker.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UserService } from 'src/app/shared/services/user.service';
import * as moment from 'moment';
import { AREA_COMPARE, BUTTONS } from './investing.const';
import { IApexChart } from 'src/app/shared/components/chart/chart.component';
import { WindowService } from 'src/app/shared/services/window.service';
import { Subscription } from 'rxjs';
import { IModalPay } from 'src/app/shared/components/modal-pay/modal-pay.component';
import { MonitorService } from 'src/app/shared/services/monitor.service';
import { IButtonFilter } from 'src/app/shared/components/filter/filter.component';

@Component({
    selector: 'app-investing-page',
    templateUrl: './investing.page.html',
    styleUrls: ['./investing.page.scss'],
    animations: [LIST_ANIMATION_LATERAL, SLIDE_Y_SIMPLE]
})

export class InvestingPage implements OnInit, OnDestroy {
    public data: IList[] = [];
    public filtered: IList[] = [];
    public dataModalPay: IModalPay;
    public animate = 'ready';
    public hasMobile = false;
    public sub: Subscription;
    public loading = true;
    public loadingFavoriteButtons = false;
    public loadCompare = true;
    public modalPayLoading = true;
    public arr = new Array(30);
    public hasChange: boolean;
    public chartCompare: IApexChart;
    public account: number;

    constructor(
        private broker: BrokerService,
        private local: LocalStorageService,
        private user: UserService,
        private snackBar: MatSnackBar,
        private modal: ModalService,
        private monitor: MonitorService,
        private window: WindowService,
    ) { this.hasMobile = window.hasMobile; }

    get favorites() {
        return this.local.getJson<IUser>('user').favorites;
    }

    get buttons(): IButtonFilter[] {
        return BUTTONS;
    }

    private openModal(): void {
        this.modal.open('modal-detail');
    }

    public openModalPay(data: IList): void {
        this.dataModalPay = {
            id: data.id,
            image: data.image.large,
            name: data.name,
            symbol: data.symbol,
            price: data.market.price.brl,
            account: this.account,
        }

        this.modalPayLoading = false;

        this.modal.open('modal-pay');
    }

    private closeModalPay(): void {
        this.modal.close('modal-pay');
    }

    public async compare() {
        this.loadCompare = true;
        this.openModal();

        await this.getChart();

        setTimeout(() => {
            this.loadCompare = false;
        }, 500);
    }

    private async getChart() {
        const from = moment().subtract(1, 'day').unix();
        const to = moment().unix();

        const series = await Promise.all(this.favorites.map(async favorite => {
            const prices = (await this.broker.marketChart(favorite.id, from, to)).prices;
            return {
                name: favorite.name,
                data: prices
            }
        }));

        this.chartCompare = AREA_COMPARE(series);
    }

    public toggle() {
        this.hasChange = true;
    }

    public async saveFavorites() {
        this.loadingFavoriteButtons = true
        this.user.updateFavorite(this.favorites)
            .then(response => {
                this.snackBar.open(response.message, '', {
                    duration: 2000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });

                this.hasChange = false;
            })
            .finally(() => setTimeout(() => this.loadingFavoriteButtons = false, 500));
    }

    public pay(data: IPay) {
        this.modalPayLoading = true;

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
                this.modalPayLoading = false;
                this.closeModalPay();
            }, 500))
    }

    private async getList() {
        this.data = await this.broker.list();

        setTimeout(() => {
            this.resetPage();
            this.loading = false;
        }, 500);
    }

    private async setWallet() {
        const wallet = await this.monitor.wallet();
        this.account = wallet.account;
    }

    // FILTER

    public filter(data: IList[]) {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            this.filtered = data;
        }, 500);
    }

    public clean() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            this.resetPage();
        }, 500);
    }

    private sort() {
        this.data.sort((a, b) => a.market.rank > b.market.rank ? 1 : -1);
    }

    private resetPage() {
        this.filtered = this.data;
        this.sort();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    async ngOnInit() {
        await this.getList();
        await this.setWallet();
        this.sub = this.window.change.subscribe((hasMobile: boolean) => this.hasMobile = hasMobile);
    }
}
