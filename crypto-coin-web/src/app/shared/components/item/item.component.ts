import { Component, Input } from '@angular/core';

export type IValidTypes = 'standard' | 'currency' | 'cpf' | 'cnpj' | 'account' | 'percent';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() label: string;
  @Input() value: string | number;
  @Input() type: IValidTypes = 'standard';

  constructor() { }
}
