import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

type TypeThemes = 'primary' | 'outline' | 'no-border';

@Component({
    selector: 'app-button',
    templateUrl: 'button.component.html',
    styleUrls: ['button.component.scss']
})

export class ButtonComponent implements OnInit {
    @Input() label: string;
    @Input() fullWidth = false;
    @Input() theme: TypeThemes = 'primary';
    @Input() type: 'button' | 'submit' = 'button';
    @Input() disabled = false;
    @Input() isLoading = false;
    @Input() labelLoading: string;

    @Output() clickEvent = new EventEmitter();

    constructor() { }

    public get loadingTheme(): string {
        return this.theme === 'primary' ? 'light' : 'primary';
    }

    public get getLabelLoading(): string {
        return this.labelLoading || 'Carregando...';
    }

    getClass(): string[] {
        const ret = [];
        if (this.fullWidth) { ret.push('full-width'); }
        if (!this.theme) { this.theme = 'primary' }

        return [...ret, this.theme || 'primary'];
    }

    emitClick() {
        if (this.disabled || this.isLoading) { return; }
        this.clickEvent.emit();
    }

    ngOnInit() { }
}
