import { Injectable } from '@angular/core';
import { endpoints } from 'src/environments/endpoints.config';
import { AjaxService } from './ajax.service';

@Injectable()
export class BrokerService {
    constructor(private ajax: AjaxService) { }

    public async list() {
        const url = endpoints.broker.list.url;
        return await this.ajax.get<IList[]>(url);
    }

    public async detail(id: string) {
        const url = endpoints.broker.detail(id).url;
        return await this.ajax.get<ICoinDetailFull>(url);
    }
}
