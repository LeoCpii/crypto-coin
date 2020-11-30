import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SLIDE_Y_SIMPLE_NOT_OPACITY } from '../../animations/slide.animation';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
  animations: [SLIDE_Y_SIMPLE_NOT_OPACITY]
})

export class ModalPageComponent {
  @Input() title: string;

  @Output() end = new EventEmitter();

  public animate = 'ready';

  constructor() { }

  public close(): void {
    this.end.emit();
  }
}
