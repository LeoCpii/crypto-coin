import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { SafeValueService } from 'src/app/shared/services/safe-value.service';
import { IItemsSafeValue, ITEMS_SAFE_VALUE } from './safe-value.const';

@Component({
    selector: 'app-safe-value-page',
    templateUrl: './safe-value.page.html',
    styleUrls: ['./safe-value.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class SafeValuePage implements OnInit {
    public visible = true;
    public label: 'Exibir valores' | 'Ocultar valores' = 'Ocultar valores';

    constructor(private safe: SafeValueService) { }

    public get items(): IItemsSafeValue[] {
        return ITEMS_SAFE_VALUE;
    }

    public get usage(): string {
        return `<div safe-value> {{ 150 |  money }} </div>`;
    }

    public toggle(): void {
        this.visible ? this.hide() : this.show();
    }

    private show(): void {
        this.visible = true;
        this.label = 'Ocultar valores';
        this.safe.setVisibility();
    }

    private hide(): void {
        this.visible = false;
        this.label = 'Exibir valores';
        this.safe.setVisibility();
    }

    ngOnInit() { }
}
