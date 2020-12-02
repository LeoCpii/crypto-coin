import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WindowService {
    @Output() change = new EventEmitter<boolean>();

    get widthMobile(): number {
        return 1024;
    }

    get hasMobile(): boolean {
        return window.innerWidth <= this.widthMobile;
    }

    public getWindow(): Window {
        return window;
    }


    constructor() { }
}
