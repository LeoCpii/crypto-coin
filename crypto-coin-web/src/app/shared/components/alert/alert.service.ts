import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlertService {
    @Output() _show = new EventEmitter<string>();

    constructor() { }

    public show(message: string): void {
        this._show.emit(message);
    }
}
