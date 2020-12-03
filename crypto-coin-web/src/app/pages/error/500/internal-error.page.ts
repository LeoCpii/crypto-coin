import { Component } from '@angular/core';
import { WindowService } from 'src/app/shared/services/window.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal-error',
  templateUrl: './internal-error.page.html',
  styleUrls: ['./internal-error.page.scss']
})
export class InternalErrorPage {
  public hasMobile = false;
  public sub: Subscription;
  
  constructor(
    private router: Router,
    private window: WindowService,
  ) { this.hasMobile = window.hasMobile; }

  goBack() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async ngOnInit() {
    this.sub = this.window.change.subscribe((hasMobile: boolean) => this.hasMobile = hasMobile);
  }
}
