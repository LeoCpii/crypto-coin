import { Injectable, EventEmitter, Output } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Injectable()
export class ModalService {
    @Output() state = new EventEmitter<boolean>();

    constructor(private modal: NgxSmartModalService) { }

    public open(identifier: string): void {
        this.modal.getModal(identifier).open();
    }

    public close(identifier: string): void {
        this.modal.getModal(identifier).close();
    }
}
