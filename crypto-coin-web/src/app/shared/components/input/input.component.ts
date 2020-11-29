import { Component, OnInit, Input, ViewChild, ElementRef, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl, FormGroup, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm } from '@angular/forms';
import { FIELD_MESSAGES, MASKS, NUMBER } from './input.consts';
import { FormatterService } from '../../services/formatter.service';
import { ValidatorService } from '../../services/validator.service';

export type IValidTypes = 'password' | 'text' | 'email' | 'cpf' | 'cnpj' | 'number' | 'cel' | 'tel';

@Component({
    selector: 'app-input',
    templateUrl: 'input.component.html',
    styleUrls: ['input.component.scss']
})

export class InputComponent implements OnInit, ControlValueAccessor {
    public onChangeFn!: (valid: string) => void;
    public onTouched!: () => void;

    public show: boolean;

    constructor(
        @Optional() @Self() private controlDir: NgControl,
        private formatter: FormatterService,
        private validator: ValidatorService
    ) { controlDir.valueAccessor = this; }

    @ViewChild('input', { static: false }) private input: ElementRef;

    @Input() control: FormControl;
    @Input() label: string;
    @Input() type: IValidTypes = 'text';
    @Input() required = false;
    @Input() messageError: string;
    @Input() displayError: boolean;
    @Input() placeholder = ' ';
    @Input() disabled = false;
    @Input() border = false;
    @Input() noMargin = false;
    @Input() info: string;

    ngOnInit() { this.control.setValidators(this.validate()); }

    get getType(): string {
        if (['password'].includes(this.type)) { return this.type; }

        return 'text';
    }

    get mask(): string | string[] {
        switch (this.type) {
            case 'cpf':
                return this.formatter.masks.cpf;
            case 'cnpj':
                return this.formatter.masks.cnpj;
            case 'tel':
                return this.formatter.masks.tel;
            case 'cel':
                return this.formatter.masks.cel;
            case 'number':
                return this.formatter.masks.number;
        }

        return null;
    }

    get isMask() {
        return MASKS.includes(this.type);
    }

    get shouldDisplayEye(): boolean {
        return this.type === 'password';
    }

    get icon(): 'visibility_off' | 'visibility' {
        return this.show ? 'visibility_off' : 'visibility';
    }

    get separator(): string {
        return NUMBER.includes(this.type) ? ',' : '';
    }

    public getClass(): string[] {
        const ret = [];
        if (this.border) { ret.push('field--border'); }
        return [...ret];
    }

    writeValue(value: string) { }

    registerOnChange(fn: (value: string) => void) {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    public sanitize(value: string) {
        const regex = /[!@#$%^&*()-\.,.\s+?":{}|<>]/g;
        return value.replace(regex, '');
    }

    public sanitizeNumber(value: string) {
        const clean = value.replace(',', '.');
        return clean;
    }

    public clean(value: string): string {
        let clean: string = value;

        if (value) {
            if (this.type === 'email') { clean = value; }
            if (NUMBER.includes(this.type)) { clean = this.sanitizeNumber(value); }
            if (MASKS.includes(this.type)) { clean = this.sanitize(value); }
        }
        return clean;
    }

    public onChange(value: string): void {
        const clean = this.clean(value);
        this.onChangeFn(clean);
    }

    public onBlur(value: string) {
        this.onTouched();
    }

    public getErrorMessage() {
        if (!this.control.errors) { return; }

        let erro = '';

        Object.keys(this.control.errors).forEach(item => {
            if (!isNaN(Number(item))) {
                erro = this.control.errors[item].message;
            }
        });

        return erro;
    }

    public toggleDisplayPassword() {
        this.show = !this.show;
        this.input.nativeElement.type = this.input.nativeElement.type === 'password' ? 'text' : 'password';
    }

    public shouldDisplayError(): boolean {
        const control = this.control;
        return ((control.errors && control.errors[0] && control.touched) || !!this.messageError);
    }

    public validate(): ValidatorFn {
        const fn: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
            const value = this.type === 'email' ? control.value : this.clean(control.value);
            const errors = [];

            const data: any = {};

            data.required = this.required ? value === '' : false;
            data.cpf = this.type === 'cpf' ? !this.validator.isValidCpf(value) : false;
            data.cnpj = this.type === 'cnpj' ? !this.validator.isValidCnpj(value) : false;
            data.number = this.type === 'number' ? !this.validator.isValidNumber(value) : false;
            data.email = this.type === 'email' ? !this.validator.isValidEmail(value) : false;
            data.tel = this.type === 'tel' ? !this.validator.isValidTel(value) : false;
            data.cel = this.type === 'cel' ? !this.validator.isValidCel(value) : false;
            data.password = this.type === 'password' ? !this.validator.isValidPassword(value) : false;

            const hasError = Object.keys(data).some(key => data[key]);

            if (hasError) {
                const att = Object.keys(data).find(item => data[item]);
                errors.push({ message: FIELD_MESSAGES[att] });
            } else {
                return null;
            }

            return errors;
        };

        return fn;
    }
}

