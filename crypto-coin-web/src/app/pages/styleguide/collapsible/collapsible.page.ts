import { Component, OnInit } from '@angular/core';
import { SLIDE_X_L_TO_R } from 'src/app/shared/animations/slide.animation';
import { LOREM_IPSUM } from './collapsible.const';

@Component({
  selector: 'app-collapsible-page',
  templateUrl: './collapsible.page.html',
  styleUrls: ['./collapsible.page.scss'],
  animations: [SLIDE_X_L_TO_R],
})
export class CollapsiblePage implements OnInit {
  public animate = 'ready';
  public loremIpsum = LOREM_IPSUM;

  constructor() { }

  ngOnInit() { }

}
