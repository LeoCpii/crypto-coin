import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common'

@Pipe({ name: 'money' })
export class MoneyPipe extends CurrencyPipe implements PipeTransform {
    transform(value: number | string): string {
        return super.transform(value, 'BRL');
    }
}
