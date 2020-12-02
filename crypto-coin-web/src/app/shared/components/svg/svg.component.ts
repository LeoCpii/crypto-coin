import { Component, OnInit, Input } from '@angular/core';

type IValidSVGTypes = 'chevron-down' | 'filter' | 'ghost' | 'wallet';
type IValidSizeTypes = 'tiny' | 'small' | 'medium' | 'large' | 'x-large';
export type IValidColorTypes = 'primary' | 'light';

@Component({
    selector: 'app-svg',
    templateUrl: 'svg.component.html',
    styleUrls: ['svg.component.scss']
})

export class SVGComponent implements OnInit {
    @Input() svg: IValidSVGTypes;
    @Input() size: IValidSizeTypes = 'medium';
    @Input() theme: IValidColorTypes = 'primary';

    private SIZES = {
        tiny: '12px',
        small: '16px',
        medium: '18px',
        large: '20px',
        'x-large': '32px',
        'responsive': '100%'
    }

    constructor() { }

    public get _size() {
        return this.SIZES[this.size];
    }

    public getClass() {
        const cls = [];
        cls.push(this.theme);
        return cls;
    }

    ngOnInit() { }
}
