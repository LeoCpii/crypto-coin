import { Component, OnInit, Input, ViewChild, ElementRef, Optional, Self, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { FormatterService } from '../../services/formatter.service';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
    selector: 'app-datepicker',
    templateUrl: 'datepicker.component.html',
    styleUrls: ['datepicker.component.scss', '../input/input.component.scss']
})

export class DatePickerComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    public onChangeFn!: (valid: string) => void;
    public onTouched!: () => void;

    public error: boolean;
    public touched: boolean;
    public field = new FormControl('');
    public messageError: string;

    constructor(
        @Optional() @Self() private controlDir: NgControl,
        private formatter: FormatterService,
    ) {
        controlDir.valueAccessor = this;
    }

    @ViewChild('input', { static: false }) private input: ElementRef;

    @Input() label: string;
    @Input() required = false;
    @Input() displayError: boolean;
    @Input() placeholder = ' ';
    @Input() disabled = false;
    @Input() border = false;

    ngOnInit() { }

    ngAfterViewInit() { this.setValue(); }

    public get control() {
        return this.controlDir.control;
    }

    get mask(): string | string[] {
        return this.formatter.masks.date;
    }

    private setValue() {
        if (this.control && this.control.value) {
            const date = moment(this.control.value).format('DD/MM/YYYY');
            this.input.nativeElement.value = date;
        }
    }

    writeValue(value: string) {
        // this.field.setValue(value);
    }

    registerOnChange(fn: (value: string) => void) {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    public onBlur(value: string) {
        this.touched = true;
        this.validate(value);
        this.onTouched();
    }

    public addEvent(value: string) {
        if (value) {
            this.onChangeFn(value);
            this.validate(value);
        }
    }

    public shouldDisplayError() {
        return !!(this.touched && this.error);
    }

    public setDisabledState() {
        return this.control.disabled;
    }

    public validate(value: string) {
        if (!value && this.required) {
            this.error = true;
            this.messageError = 'Campo obrigatório';
        } else {
            this.error = false;
        }
    }
}

