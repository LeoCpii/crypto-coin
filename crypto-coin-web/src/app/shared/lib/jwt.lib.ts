import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

interface IJWT {
    id: string;
    email: string;
    name: string;
}

@Injectable()
export class JWT {
    constructor(private localStorageService: LocalStorageService) { }

    public jwtHelper = new JwtHelperService();

    public get jwt(): string {
        return this.localStorageService.get('token');
    }

    public decodeToken(): IJWT {
        return this.jwtHelper.decodeToken(this.jwt);
    }

    public isTokenInvalid(): boolean {
        if (this.jwt == null || this.jwt === '') { return true; } else { return this.isTokenExpired(); }
    }

    public isTokenExpired(): boolean {
        return this.jwtHelper.isTokenExpired(this.jwt);
    }
}
