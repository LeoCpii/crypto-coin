import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { BUTTONS, DATA, IDataFilter } from './advanced-filter.const';

@Component({
    selector: 'app-advanced-filter-page',
    templateUrl: './advanced-filter.page.html',
    styleUrls: ['./advanced-filter.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class AdvancedFilterPage implements OnInit {
    public show: boolean;
    public loading = true;
    public filtered: IDataFilter[] = [];

    constructor() { }

    get data(): IDataFilter[] {
        return DATA;
    }

    get buttons() {
        return BUTTONS;
    }

    public filter(data: IDataFilter[]) {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            this.filtered = data;
        }, 500);
    }

    public clean() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            this.resetPage();
        }, 500);
    }

    private resetPage() {
        this.filtered = this.data;
    }

    ngOnInit() {
        this.resetPage();
        setTimeout(() => {
            this.loading = false;
        }, 500);
    }
}
