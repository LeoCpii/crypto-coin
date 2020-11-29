import { Component, OnInit, Input } from '@angular/core';

export interface IRequirement {
    label: string;
    active: boolean;
}

@Component({
    selector: 'app-password-requirements-item',
    templateUrl: 'password-requirements-item.component.html',
    styleUrls: ['password-requirements-item.component.scss']
})

export class PasswordRequirementsItemComponent implements OnInit {
    @Input() data: IRequirement;

    constructor() { }

    public getClass(): string[] {
        const ret = [];

        if (this.data.active) { ret.push('check--success'); }
        if (!this.data.active) { ret.push('check--empty'); }

        return ret;
    }

    ngOnInit() { }
}
