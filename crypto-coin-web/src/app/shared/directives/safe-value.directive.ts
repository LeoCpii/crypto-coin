import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SafeValueService } from '../services/safe-value.service';

@Directive({ selector: '[safe-value]' })
export class SafeValueDirective implements OnInit, AfterViewInit, OnDestroy {
    public original: string;
    private subscription: Subscription

    constructor(
        private el: ElementRef,
        private safe: SafeValueService
    ) { }

    private show(): void {
        this.el.nativeElement.innerText = this.original;
    }

    private hide(): void {
        this.el.nativeElement.innerHTML = 'R$ &bull;&bull;&bull;&bull;&bull;&bull;';
    }

    private toggle(state: boolean): void {
        state ? this.show() : this.hide()
    }

    ngAfterViewInit() {
        this.original = this.el.nativeElement.innerText;
        this.toggle(this.safe.visible);
    }

    ngOnInit() {
        this.subscription = this.safe.visibleEmitter.subscribe((state: boolean) => this.toggle(state));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
