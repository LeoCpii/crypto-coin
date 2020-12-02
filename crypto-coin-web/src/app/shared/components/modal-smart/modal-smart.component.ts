import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { ModalService } from './modal-smart.service';


@Component({
    selector: 'app-modal-smart',
    templateUrl: './modal-smart.component.html',
    styleUrls: ['./modal-smart.component.scss'],
})
export class ModalSmartComponent implements OnInit {
    @Input() identifier: string;
    @Input() caption: string;
    @Input() clss: string[] = [];
    @Input() cancelLabel = 'Cancelar';
    @Input() agreeLabel = 'Salvar';
    @Input() disabledAgree: boolean;
    @Input() showCancel = true;
    @Input() showAgree = true;
    @Input() agreeTypeButton: 'button' | 'submit' = 'button';
    @Input() cancelTypeButton: 'button' | 'submit' = 'button';
    @Input() noFooter: boolean;

    @Output() agreeClick = new EventEmitter();
    @Output() closeEvent = new EventEmitter();

    constructor(private modal: ModalService) {}

    public open() {
        this.modal.state.emit(true);
    }

    public close() {
        this.modal.state.emit(false);
        this.closeEvent.emit();
    }

    public cancel() {
        this.close();
        this.modal.close(this.identifier);
    }

    public agree() {
        this.agreeClick.emit();
    }

    public getClass() {
        let clss = 'nsm-dialog-animation-ttb';

        this.clss.forEach(item => clss += ` ${item}`);

        return clss;
    }

    ngOnInit() { }
}
