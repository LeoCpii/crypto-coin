import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  @Input() theme: 'primary' | 'light' = 'primary';
  @Input() size: number = 3.2;

  public gradientId: string;

  constructor() {
    this.gradientId = `loading-gradient${Date.now()}`;
  }

  public getClass(): string[] {
    const cls = [];
    cls.push(this.theme);
    return cls;
  }

  public getStyle() {
    return `height: ${this.size}rem; width: ${this.size}rem;`;
  }
}
