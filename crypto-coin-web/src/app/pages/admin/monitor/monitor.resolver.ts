import { Injectable } from '@angular/core';
import { Resolve, } from '@angular/router';
import { MonitorService } from 'src/app/shared/services/monitor.service';
import { IMonitorPage } from './monitor.page';

export interface AgroupDetail extends ICoin {
    total: {
        usd: number;
        brl: number;
    }
}

@Injectable({ providedIn: 'root' })
export class MonitorResolver implements Resolve<IMonitorPage> {

    constructor(
        private monitor: MonitorService,
    ) { }

    async resolve() {
        const monitor = await this.monitor.wallet();

        let coins = [];
        let agroupDetail: AgroupDetail[] = [];
        let totalInvested: { usd: any; brl: any; };

        if (monitor.coins.length) {
            coins = await Promise.all(monitor.coins.map(coin => {
                return this.monitor.coinDetail(coin.id);
            }));

            agroupDetail = this.agroupDetail(coins, monitor.coins);
            totalInvested = this.totalInvested(agroupDetail);
        }

        return {
            id: monitor.id,
            account: monitor.account,
            coins: agroupDetail.length ? agroupDetail : coins,
            amountInvested: {
                usd: totalInvested ? totalInvested.usd : 0,
                brl: totalInvested ? totalInvested.brl : 0,
            },
            patrimony: {
                usd: totalInvested ? totalInvested.usd + monitor.account : monitor.account,
                brl: totalInvested ? totalInvested.brl + monitor.account : monitor.account,
            },
        };
    }

    private agroupDetail(details: ICoinDetail[], coins: ICoin[]): AgroupDetail[] {
        return coins.map(coin => {
            const currentDetail = details.find(detail => detail.id === coin.id);
            return {
                id: coin.id,
                name: coin.name,
                quota: coin.quota,
                symbol: coin.symbol,
                total: {
                    usd: coin.quota * currentDetail.market_data.price.usd,
                    brl: coin.quota * currentDetail.market_data.price.brl
                }
            }
        });
    }

    private totalInvested(agroupDetail: AgroupDetail[]): { usd: number; brl: number; } {
        const sumBrl = agroupDetail.reduce((total, current) => total + current.total.brl, 0);
        const sumUsd = agroupDetail.reduce((total, current) => total + current.total.usd, 0);

        return {
            usd: sumUsd,
            brl: sumBrl,
        }
    }
}
