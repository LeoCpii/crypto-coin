import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidatorService {
    private emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    private numberRegex = /^[0-9]+$/;
    private telRegex = /(^\d{10}$)|(^$)/;
    private celRegex = /(^\d{11}$)|(^$)/;
    private cpfRegex = /^\d{3}\d{3}\d{3}\d{2}$/;
    private cnpjRegex = /^\d{2}\d{3}\d{3}\d{4}\d{2}$/;

    public isValidEmail(email: string): boolean {
        return this.emailRegex.test(email);
    }

    public isValidNumber(value: string): boolean {
        return this.numberRegex.test(value);
    }

    public isValidTel(value: string): boolean {
        return this.telRegex.test(value);
    }

    public isValidCel(value: string): boolean {
        return this.celRegex.test(value);
    }

    public isValidCpf(value: string): boolean {
        return this.cpfRegex.test(value);
    }

    public isValidCnpj(value: string): boolean {
        return this.cnpjRegex.test(value);
    }

    public isValidPassword(value: string): boolean {
        return value.length >= 6;
    }
}
