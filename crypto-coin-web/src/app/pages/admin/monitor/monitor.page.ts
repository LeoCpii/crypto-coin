import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { COLORS } from 'src/app/shared/constants/colors.const';
import { SafeValueService } from 'src/app/shared/services/safe-value.service';
import { CHART } from './monitor.const';
import { AgroupDetail } from './monitor.resolver';
import { SLIDE_Y_SIMPLE, SLIDE_X_STATE } from 'src/app/shared/animations/slide.animation';
import { IApexChart } from 'src/app/shared/components/chart/chart.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UserService } from 'src/app/shared/services/user.service';
import * as moment from 'moment';
import { WindowService } from 'src/app/shared/services/window.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MonitorService } from 'src/app/shared/services/monitor.service';
import { IModalPay } from 'src/app/shared/components/modal-pay/modal-pay.component';
import { ModalService } from 'src/app/shared/components/modal-smart/modal-smart.service';

export interface IMonitorPage {
    id: string;
    account: number;
    valuation: number;
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
    animations: [LIST_ANIMATION_LATERAL, SLIDE_Y_SIMPLE, SLIDE_X_STATE]
})

export class MonitorPage implements OnInit, OnDestroy {
    public data: IMonitorPage;
    public animate = 'ready';
    public hasMobile = false;
    public modalLoading = true;
    public sub: Subscription;
    public dataModal: IModalPay;
    private state: boolean;
    public loadingPrice: boolean;
    public loadingVolume: boolean;
    public loading = true;
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

    public chart: IApexChart;

    constructor(
        private safe: SafeValueService,
        private route: ActivatedRoute,
        private router: Router,
        private user: UserService,
        private local: LocalStorageService,
        private modal: ModalService,
        private window: WindowService,
        private monitor: MonitorService,
        private snackBar: MatSnackBar,
    ) { this.hasMobile = window.hasMobile; }

    get isEmpty(): boolean {
        return !this.data.coins.length;
    }

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

    get valuation(): number {
        return this.data.valuation;
    }

    get button() {
        const state = this.state ? 'hidden' : 'show';
        return this.states[state];
    }

    get negative(): boolean {
        return this.data.valuation < 0;
    }

    get colors() {
        return COLORS;
    }

    get date() {
        return moment().format('DD/MM/YYYY');
    }

    get favorites() {
        return this.local.getJson<IUser>('user') ? this.local.getJson<IUser>('user').favorites : [];
    }

    public async openModal(id: string, modalName: 'modal-pay' | 'modal-sale') {
        const coin = await this.monitor.coinDetail(id);

        this.modal.open(modalName);

        if (modalName === 'modal-pay') {
            this.dataModal = {
                id: this.data.id,
                image: coin.image.large,
                name: coin.name,
                symbol: coin.symbol,
                price: coin.market_data.price.brl,
                account: this.account,
            }
        } else {
            const currentCoin = this.data.coins.find(coin => coin.id === id);

            this.dataModal = {
                id: this.data.id,
                image: coin.image.large,
                name: coin.name,
                symbol: coin.symbol,
                price: coin.market_data.price.brl,
                account: currentCoin.total.brl,
                setValue: currentCoin.total.brl
            }
        }

        setTimeout(() => { this.modalLoading = false; }, 500);
    }

    private closeModal(modalName: 'modal-pay' | 'modal-sale'): void {
        this.modal.close(modalName);
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
    
                setTimeout(() => location.reload(), 500);
            })
            .catch(erro => console.log(erro))
            .finally(() => setTimeout(() => {
                this.modalLoading = false;
                this.closeModal('modal-pay');
            }, 500))
    }

    public sale(data: IPay) {
        this.modalLoading = true;

        this.user.sale(data)
            .then(response => {
                this.snackBar.open(response.message, '', {
                    duration: 2000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });

                setTimeout(() => location.reload(), 500);
            })
            .catch(erro => console.log(erro))
            .finally(() => setTimeout(() => {
                this.modalLoading = false;
                this.closeModal('modal-sale');
            }, 500))
    }

    public go(): void {
        this.router.navigate(['admin', 'aport']);
    }

    public toggle() {
        this.state = !this.state;
        this.safe.setVisibility();
    }

    public setLoadingPrice(state: boolean) {
        this.loadingPrice = state;
    }

    public setLoadingVolume(state: boolean) {
        this.loadingVolume = state;
    }

    private getChart() {
        this.loading = true;
        const labels = this.data.coins.map(coin => coin.name);
        const series = this.data.coins.map(coin => coin.total[this.currency]);
        this.chart = CHART(series, labels);

        setTimeout(() => {
            this.loading = false;
        }, 500);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    async ngOnInit() {
        this.data = this.route.snapshot.data.data;

        if (!this.isEmpty) { this.getChart(); }
        else {
            setTimeout(() => {
                this.loading = false;
            }, 500);
        }

        this.sub = this.window.change.subscribe((hasMobile: boolean) => this.hasMobile = hasMobile);
    }
}
