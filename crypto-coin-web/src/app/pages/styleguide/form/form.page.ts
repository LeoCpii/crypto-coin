import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { INPUTS, RADIO_GROUP, SELECT } from './form.const';

@Component({
    selector: 'app-form-page',
    templateUrl: './form.page.html',
    styleUrls: ['./form.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class FormPage implements OnInit {
    public show: boolean;

    public form = new FormGroup({
        standard: new FormControl(''),
        required: new FormControl(''),
        disabled: new FormControl(''),
        cpf: new FormControl(''),
        cnpj: new FormControl(''),
        number: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        radio: new FormControl(''),
        icon: new FormControl(''),
        selects: new FormControl('')
    });

    constructor() { }

    public get inputs() {
        return INPUTS;
    }

    public get radios() {
        return RADIO_GROUP;
    }

    public get selects() {
        return SELECT;
    }

    ngOnInit() {
        setTimeout(() => { this.show = true }, 0);
    }
}
