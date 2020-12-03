import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { WindowService } from 'src/app/shared/services/window.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss']
})
export class NotFoundPage {
  public hasMobile = false;
  public sub: Subscription;
  
  constructor(
    private location: Location,
    private window: WindowService,
  ) { this.hasMobile = window.hasMobile; }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async ngOnInit() {
    this.sub = this.window.change.subscribe((hasMobile: boolean) => this.hasMobile = hasMobile);
  }
}
