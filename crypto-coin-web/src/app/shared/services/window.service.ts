import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WindowService {
    @Output() hasMobile = new EventEmitter<boolean>();

    get widthMobile(): number {
        return 1024;
    }

    public getWindow(): Window {
        return window;
    }


    constructor() { }
}
