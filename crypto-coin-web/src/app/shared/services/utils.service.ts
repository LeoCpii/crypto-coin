import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {
    public sortArrayWithDate<T>(array: T[], prop: string, order: 'asc' | 'desc' = 'asc'): T[] {
        return array.sort((a, b) =>
            order === 'asc'
                ? new Date(a[prop]).getTime() - new Date(b[prop]).getTime()
                : new Date(b[prop]).getTime() - new Date(a[prop]).getTime()
        );
    }

    public clipboard(word: string): void {
        const el = document.createElement('textarea');
        el.value = word;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
}
