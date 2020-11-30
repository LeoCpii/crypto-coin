import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { endpoints } from 'src/environments/endpoints.config';
import { AjaxService } from './ajax.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class SecurityService {
    constructor(
        private ajax: AjaxService,
        private storage: LocalStorageService,
        private router: Router
    ) { }

    public async register(params: ISecurityRegister): Promise<{ token: string }> {
        const url = endpoints.auth.register.url;
        return await this.ajax.post(url, params);
    }

    public async login(params: { email: string }): Promise<{ token: string }> {
        const url = endpoints.auth.login.url;
        return await this.ajax.post(url, params);
    }

    // public async forgot(params: { email: string }) {
    //     const url = endpoints.auth.forgot.url;
    //     return await this.ajax.put<{ data: ILogin }>(url, params);
    // }

    public logout(): void {
        if (this.router.url !== '/auth/login') {
            this.redirect();
        }

        this.storage.clear();
    }

    private redirect() {
        const origin = window.location.origin;
        window.location.href = `${origin}/auth/login`;
    }

    public saveToken(token: string): void {
        this.storage.setJson('token', token);
    }
}
