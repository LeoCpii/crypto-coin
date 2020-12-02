import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';
import { endpoints } from 'src/environments/endpoints.config';

@Injectable()
export class UserService {
    constructor(private ajax: AjaxService) { }

    public async user() {
        const url = endpoints.user.info.url;
        return await this.ajax.get<IUser>(url);
    }

    public async updateFavorite(favorite: Array<{ name: string; id: string }>) {
        const url = endpoints.user.favoritesUpdate.url;
        return await this.ajax.put<{ message: string }>(url, favorite);
    }

    public async contribution(params: { contribution: number }) {
        const url = endpoints.user.contribution.url;
        return await this.ajax.post<{ message: string }>(url, params);
    }

    public async addCoin(params: IPay) {
        const url = endpoints.user.add.url;
        return await this.ajax.post<{ message: string }>(url, params);
    }
}
