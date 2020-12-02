import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SecurityService } from 'src/app/shared/services/security.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WindowService } from 'src/app/shared/services/window.service';
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

export class AdminPage implements OnInit, OnDestroy {
    public data: IAdminPage;
    public hasMobile = false;
    public sub: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private security: SecurityService,
        private userService: UserService,
        private local: LocalStorageService,
        private window: WindowService,
    ) { this.hasMobile = window.hasMobile; }

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

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    async ngOnInit() {
        this.data = this.route.snapshot.data.data;

        const user = this.local.getJson<IUser>('user');

        if (!user) {
            const user = await this.userService.user();
            this.local.setJson('user', user);
        }

        this.sub = this.window.change.subscribe((hasMobile: boolean) => this.hasMobile = hasMobile);
    }
}
