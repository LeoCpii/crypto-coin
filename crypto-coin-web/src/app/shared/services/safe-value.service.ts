import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SafeValueService {
    private _visible = true;

    @Output() visibleEmitter = new EventEmitter<boolean>();

    public get visible(): boolean {
        return this._visible;
    }

    public setVisibility() {
        this._visible = !this._visible;
        this.visibleEmitter.emit(this._visible);
    }

    constructor() { }
}
