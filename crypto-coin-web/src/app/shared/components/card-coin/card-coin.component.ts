import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-coin',
  templateUrl: './card-coin.component.html',
  styleUrls: ['./card-coin.component.scss'],
})
export class CardCoinComponent {
  @Input() data: IList;

  public state: boolean;

  constructor(private router: Router) { }

  get image() {
    return this.data.image.small || this.data.image.thumb || this.data.image.large;
  }

  get arrow() {
    return this.data.market.changePercent24h > 0 ? 'arrow_upward' : 'arrow_downward';
  }

  public toogle() {
    this.state = !this.state;
  }

  public getState() {
    const cls = [];

    if (this.data.market.changePercent24h > 0) { cls.push('state--positive') }
    if (this.data.market.changePercent24h < 0) { cls.push('state--negative') }

    return cls;
  }

  public goDetail() {
    this.router.navigate(['admin', 'detail', this.data.id]);
  }
}
