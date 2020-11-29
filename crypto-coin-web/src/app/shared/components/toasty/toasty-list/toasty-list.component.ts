import { Component } from '@angular/core';
import { IToasty } from '../toasty.component';
import { ToastyService } from './../toasty.service';

@Component({
  selector: 'app-toasty-list',
  templateUrl: './toasty-list.component.html',
  styleUrls: ['./toasty-list.component.scss'],
})

export class ToastyListComponent {
  public toastys: IToasty[] = [];

  constructor(private toasty: ToastyService) {
    this.toasty._show.subscribe((data: IToasty[]) => { this.toastys = data; });
  }
}
