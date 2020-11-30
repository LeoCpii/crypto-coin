import { Injectable } from '@angular/core';
import { endpoints } from 'src/environments/endpoints.config';
import { AjaxService } from './ajax.service';

@Injectable()
export class MonitorService {
    constructor(private ajax: AjaxService) { }

    public async wallet(email: string) {
        const url = endpoints.monitor.wallet(email).url;
        return await this.ajax.get<IWallet>(url);
    }

    public async coinDetail(coinId: string) {
        const url = endpoints.monitor.coinDetail(coinId).url;
        return await this.ajax.get<ICoinDetail>(url);
    }
}
