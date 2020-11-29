import { Directive, HostListener } from '@angular/core';
import { WindowService } from '../services/window.service';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[resize]'
})
export class ResizeDirective {
    constructor(private win: WindowService) { }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const width = event.target.innerWidth;
        this.win.hasMobile.emit(width <= this.win.widthMobile);
    }
}