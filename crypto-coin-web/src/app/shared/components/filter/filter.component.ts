import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WindowService } from '../../services/window.service';

export interface IButtonFilter {
    label: string;
    active: boolean;
    fn: (data: Array<Object>) => Array<Object>;
    group: string;
}

@Component({
    selector: 'app-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class FilterComponent implements OnInit, OnDestroy {
    @Input() buttons: IButtonFilter[] = [];
    @Input() data: any[] = [];
    @Input() propSearch: string;

    @Output() filter = new EventEmitter<any[]>();
    @Output() clean = new EventEmitter();

    public timeout: NodeJS.Timeout;
    public animate = 'show';
    public hasFilter: boolean;
    public word: string;
    public sub: Subscription;
    public hasMobile = false;

    constructor(private window: WindowService) { this.hasMobile = window.hasMobile; }

    public do(button: IButtonFilter) {
        button.active = !button.active;

        this.buttons.forEach(btn => {
            const sameGroup = btn.group === button.group && btn.label !== button.label;
            if (sameGroup) { btn.active = false; }
        });

        this.purify();
    }

    private purify() {
        this.hasFilter = !!this.buttons.filter(btn => btn.active).length || !!this.word;

        let helper = this.data;

        if (this.word) { helper = this.searchForProp(this.word); }

        this.buttons.forEach(btn => {
            if (btn.active) { helper = btn.fn(helper); }
        });

        this.filter.emit(helper);
    }

    public search(word: InputEvent): void {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.word = word.target['value'];
            this.purify();
        }, 500);
    }

    private searchForProp(word: string) {
        return this.data.filter(item =>
            item[this.propSearch].toLocaleLowerCase().includes(word.toLocaleLowerCase())
        );
    }

    public resetButton() {
        this.buttons.forEach(current => current.active = false);
    }

    public reset() {
        if (this.hasFilter) {
            this.resetButton();
            this.word = '';
            this.hasFilter = false;
            this.clean.emit();
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.reset();
    }

    ngOnInit() {
        this.sub = this.window.change.subscribe((hasMobile: boolean) => {
            this.hasMobile = hasMobile;
        });
    }
}
