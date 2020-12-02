import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { JWT } from 'src/app/shared/lib/jwt.lib';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UserService } from 'src/app/shared/services/user.service';
import { IAdminPage } from './admin.page';

@Injectable({ providedIn: 'root' })
export class AdminResolver implements Resolve<IAdminPage> {

    constructor(
        private jwt: JWT,
        private user: UserService,
        private local: LocalStorageService,
    ) { }

    async resolve() {
        const data = this.jwt.decodeToken();

        const user = await this.user.user();
        this.local.setJson('user', user);

        return {
            name: data.name,
            email: data.email,
        };
    }
}
