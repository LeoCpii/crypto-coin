import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class FormatterService {
    public readonly MONTH_FORMAT = 'MM/YYYY';
    public readonly DATE_FORMAT = 'DD/MM/YYYY';
    public readonly DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';
    public readonly regexpObj = /\{([\w\:\.]+|)\}/g;
    public readonly phoneRegex = /^(\d{3})(\d{4,5})(\d{3,4})$/;

    // Masks for ngx-mask package
    public readonly masks = {
        cpf: '000.000.000-00',
        cnpj: '00.000.000/0000-00',
        cc: '0000000000-0',
        cel: '(00) 00000-0000',
        tel: '(00) 0000-0000',
        number: '9*',
        decimal: 'separator.2',
        date: 'd0/M0/0000',
        crm: '00000000-0/SS'
    };

    constructor() { }

    public fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    public getConvertFileSize(fileSizeInBytes: number): string {
        let i = -1;
        const byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
        do {
            fileSizeInBytes = fileSizeInBytes / 1024;
            i++;
        } while (fileSizeInBytes > 1024);
        return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    }

    public formatPhoneNumber(value: number | string, type: 'fixo' | 'celular'): string {
        if (!value) { return ''; }

        const unformattedValue = value.toString().replace(/\D/g, '');

        if (unformattedValue.length < 8) { return value.toString(); }

        if (type === 'fixo') {
            if (unformattedValue.length === 9 || unformattedValue.length === 10) {
                return unformattedValue.replace(/^(\d{1,2})(\d{4})(\d{4})$/, `(${unformattedValue.length === 9 ? '0' : ''}$1) $2-$3`);
            }

            return unformattedValue.replace(/^(\d{4})(\d{4})$/, '$1-$2');
        }

        if (type === 'celular') {
            if (unformattedValue.length === 11 || unformattedValue.length === 10) {
                return unformattedValue.replace(/^(\d{1,2})(\d{5})(\d{4})$/, `(${unformattedValue.length === 10 ? '0' : ''}$1) $2-$3`);
            }

            return unformattedValue.replace(/^(\d{5})(\d{4})$/, '$1-$2');
        }
    };
}
