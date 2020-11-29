import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { LOADINGS, RISKS, SECTIONS, SVGS, SVG_SIZES } from './icon.const';

@Component({
    selector: 'app-icon-page',
    templateUrl: './icon.page.html',
    styleUrls: ['./icon.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class IconPage implements OnInit {
    public show: boolean;

    constructor() { }

    public get sections() {
        return SECTIONS;
    }

    public get risks() {
        return RISKS;
    }

    public get loadings() {
        return LOADINGS;
    }

    public get svgs() {
        return SVGS;
    }

    
    public get svgSizes() {
        return SVG_SIZES;
    }

    public getTheme(theme: 'primary' | 'white'): string[] {
        return [`theme--${theme}`];
    }

    ngOnInit() {
        setTimeout(() => { this.show = true }, 0);
    }
}
