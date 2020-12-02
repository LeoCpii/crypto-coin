import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { IValidColorTypes } from '../svg/svg.component';
import { CollapsibleService } from './collapsible.service';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
        opacity: 1,
      })),
      state('closed', style({
        height: '0px',
        opacity: 0.5,
      })),
      transition('open => closed', [
        animate('.3s ease-out')
      ]),
      transition('closed => open', [
        animate('.3s ease-out')
      ]),
    ]),
  ],
})
export class CollapsibleComponent implements OnInit {
  private static nextId = 0;

  @Input() theme: IValidColorTypes = 'primary';
  @Input() group: boolean;

  public isOpen = false;
  public id = `collapsible_${++CollapsibleComponent.nextId}`;

  constructor(private collapsibleService: CollapsibleService) { }

  get state() {
    return this.isOpen ? 'open' : 'closed';
  }

  private open(): void {
    if (this.group) { this.collapsibleService.manager(this.id); }
    this.isOpen = true;
  }

  private close(): void {
    this.isOpen = false;
  }

  private checkClose(): void {
    if (this.group) { this.close(); }
  }

  public toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  ngOnInit(): void {
    this.collapsibleService.add({ id: this.id, state: false });
    this.collapsibleService.hub.subscribe((id: string) => { if (id !== this.id) { this.checkClose(); } });
  }
}
