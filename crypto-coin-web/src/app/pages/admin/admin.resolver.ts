import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { JWT } from 'src/app/shared/lib/jwt.lib';
import { IAdminPage } from './admin.page';

@Injectable({ providedIn: 'root' })
export class AdminResolver implements Resolve<IAdminPage> {

    constructor(private jwt: JWT) { }

    async resolve(route: ActivatedRouteSnapshot) {
        const data = this.jwt.decodeToken();

        return {
            name: data.name,
            email: data.email,
        };
    }
}
