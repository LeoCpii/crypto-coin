import { Component, Input } from '@angular/core';

export type IValidTypes = 'standard' | 'currency' | 'cpf' | 'cnpj' | 'account' | 'percent';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  constructor() { }
}
