import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormatterService } from '../../services/formatter.service';
import { WindowService } from '../../services/window.service';

export interface IModalPay {
  id: string;
  image: string;
  name: string;
  symbol: string;
  price: number;
  account: number;
}

@Component({
  selector: 'app-modal-pay',
  templateUrl: './modal-pay.component.html',
  styleUrls: ['./modal-pay.component.scss'],
})
export class ModalPayComponent implements OnInit, OnDestroy {
  @Input() data: IModalPay;
  @Input() loading: boolean;

  @Output() payEvent = new EventEmitter<IPay>();

  public hasMobile = false;
  public sub: Subscription;
  public model = '';
  public form = new FormGroup({
    money: new FormControl(0)
  }, this.validate());

  constructor(
    private formatter: FormatterService,
    private window: WindowService,
  ) { this.hasMobile = window.hasMobile; }

  get balanceAvailable(): string {
    const value = this.data.account - Number(this.model);
    return this.formatter.currencyFormatter({ value, prefix: 'R$' });
  }

  get quota(): number {
    const value = Number(this.model) / this.data.price;
    return Number(value.toFixed(2));
  }

  get errors(): string {
    const error = this.form.errors;
    return !error || error[0];
  }

  get hasError(): boolean {
    const error = this.form.errors;
    return error && Array.isArray(error);
  }

  getOptions() {
    const ret: { prefix?: string; thousands?: string, decimal?: string } = {};

    const prefix = 'R$';

    if (prefix) { ret.prefix = `${prefix} `; }
    ret.decimal = ',';
    ret.thousands = '.';

    return ret;
  }

  public onChange(value: string): void {
    this.form.setValue({ money: value });
  }

  public add(value: number) {
    const current = this.form.get('money').value;
    const sum = current + value;
    this.form.setValue({ money: sum });
    this.model = sum;
  }

  public pay() {
    const params = {
      id: this.data.id,
      symbol: this.data.symbol,
      name: this.data.name,
      quota: this.quota
    }

    this.payEvent.emit(params);
  }

  public reset() {
    setTimeout(() => {
      this.model = '';  
      this.form.reset();
    }, 200);
  }

  public validate(): ValidatorFn {
    const fn: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
      if (this.data) {
        const value = this.data.account - Number(control.value.money);
        const errors = [];

        if (control.value.money = 0) {
          errors.push('Saldo insuficiente');
        }

        if (value < 0) {
          errors.push('Saldo insuficiente');
        }

        return errors.length ? errors : null;
      }
      return null;
    }
    return fn;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.sub = this.window.change.subscribe((hasMobile: boolean) => this.hasMobile = hasMobile);
  }
}
