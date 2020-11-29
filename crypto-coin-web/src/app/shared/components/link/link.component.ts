import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-link',
    templateUrl: 'link.component.html',
    styleUrls: ['link.component.scss']
})

export class LinkComponent implements OnInit {
    @Input() link: string;

    constructor(private router: Router) { }

    get external() {
        return /^http/.test(this.link);
    }

    public go() {
        if (!this.external) {
            this.router.navigate([this.link]);
        }

        if (this.external) {
            const w = window.open();
            w.location.href = this.link;
        }
    }

    ngOnInit() {
        if (!this.link) { throw new Error('Property link is required'); }
    }
}
