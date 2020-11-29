import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { SLIDE_Y_SIMPLE } from 'src/app/shared/animations/slide.animation';
import { IButtonPage, PAGES } from './styleguide.consts';

@Component({
    selector: 'app-styleguide',
    templateUrl: './styleguide.page.html',
    styleUrls: ['./styleguide.page.scss'],
    animations: [SLIDE_Y_SIMPLE, LIST_ANIMATION_LATERAL]
})

export class StyleguidePage implements OnInit {
    public animate = 'ready';
    public pages: IButtonPage[] = PAGES;
    public select: IButtonPage[] = [];
    public timeout: NodeJS.Timeout;
    public searching = false;
    public noData = false;

    constructor() { }

    public search(input: InputEvent): void {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            const word = input.target['value'];
            if (word.length > 2) {
                const arr = this.filter(word);
                this.noData = !arr.length;
                this.setButtons(arr);
            } else {
                if (!word) {
                    this.setButtons([]);
                    this.noData = false;
                }
            }
        }, 500);
    }

    public filter(word: string): IButtonPage[] {
        return this.pages.filter(item =>
            item.label.toLocaleLowerCase().includes(word.toLocaleLowerCase())
        );
    }

    private setButtons(data: IButtonPage[]): void {
        this.searching = true;
        this.select = data.length ? data : this.pages;
        setTimeout(() => { this.searching = false; }, 500);
    }

    ngOnInit() {
        this.setButtons([]);
    }
}
