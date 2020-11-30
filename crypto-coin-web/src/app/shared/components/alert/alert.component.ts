import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SLIDE_Y_STATE } from '../../animations/slide.animation';
import { AlertService } from './alert.service';

export type IValidTypes = 'standard' | 'currency' | 'cpf' | 'cnpj' | 'account' | 'percent';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [SLIDE_Y_STATE]
})

export class AlertComponent implements OnInit, OnDestroy {
  public message: string;

  private sub: Subscription;

  constructor(private alert: AlertService) { }

  public hide() {
    this.message = '';
  }

  ngOnInit() {
    this.sub = this.alert._show.subscribe((message: string) => {
      this.message = message;
      setTimeout(() => { this.hide(); }, 10000);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
