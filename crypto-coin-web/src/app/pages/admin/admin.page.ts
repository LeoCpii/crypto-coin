import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { SecurityService } from 'src/app/shared/services/security.service';
import { PAGES } from './admin.const';

export interface IAdminPage {
    email: string;
    name: string;
}

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin.page.html',
    styleUrls: ['./admin.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class AdminPage implements OnInit {
    public data: IAdminPage;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private security: SecurityService
    ) { }

    get pages() {
        return PAGES;
    }

    get name(): string {
        const name = this.data.name.split(' ')[0];
        return `Olá, ${name}`;
    }

    public go(route: string): void {
        this.router.navigate(['admin', route]);
    }

    public logout() {
        this.security.logout();
    }

    ngOnInit() {
        this.data = this.route.snapshot.data.data;
    }
}
