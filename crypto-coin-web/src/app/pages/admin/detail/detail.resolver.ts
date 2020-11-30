import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BrokerService } from 'src/app/shared/services/broker.service';
import { IDetailPage } from './detail.page';

@Injectable({ providedIn: 'root' })
export class DetailResolver implements Resolve<IDetailPage> {

    constructor(private broker: BrokerService) { }

    async resolve(route: ActivatedRouteSnapshot) {
        const id = route.params.id;

        const detail = await this.broker.detail(id);

        return detail;
    }
}
