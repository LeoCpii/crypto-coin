import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { AlertService } from '../alert/alert.service';

export interface ICadState {
  id: string;
  state: boolean;
}

@Component({
  selector: 'app-card-coin',
  templateUrl: './card-coin.component.html',
  styleUrls: ['./card-coin.component.scss'],
})
export class CardCoinComponent implements OnInit {
  @Input() data: IList;

  @Output() toggleEvent = new EventEmitter();
  @Output() payEvent = new EventEmitter<IList>();

  public state: boolean;

  constructor(
    private router: Router,
    private local: LocalStorageService,
    private alert: AlertService
  ) { }

  get image() {
    return this.data.image.small || this.data.image.thumb || this.data.image.large;
  }

  get arrow() {
    return this.data.market.changePercent24h > 0 ? 'arrow_upward' : 'arrow_downward';
  }

  get user() {
    return this.local.getJson<IUser>('user');
  }

  private setState() {
    this.state = this.user.favorites.some(favorite => favorite.id === this.data.id);
  }

  private removeFavorite(id: string) {
    const user = this.user;
    const index = user.favorites.findIndex(favorite => favorite.id === id);
    user.favorites.splice(index, 1);
    this.local.setJson('user', user);
  }

  private addFavorite() {
    const user = this.user;
    user.favorites.push({
      name: this.data.name,
      id: this.data.id
    });
    this.local.setJson('user', user);
  }

  public toggle() {
    if (!this.state && this.user.favorites.length > 2) {
      this.alert.show('Você só pode ter até 3 favoritos');
      return;
    };

    if (this.state) { this.removeFavorite(this.data.id); }
    if (!this.state) { this.addFavorite(); }

    this.state = !this.state;
    console.log()
    this.toggleEvent.emit();
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

  public pay(): void {
    this.payEvent.emit(this.data);
  }

  ngOnInit() {
    this.setState();
  }
}
