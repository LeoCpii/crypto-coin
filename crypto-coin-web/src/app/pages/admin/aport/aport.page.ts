import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { SLIDE_Y_STATE } from 'src/app/shared/animations/slide.animation';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WindowService } from 'src/app/shared/services/window.service';

@Component({
    selector: 'app-aport-page',
    templateUrl: './aport.page.html',
    styleUrls: ['./aport.page.scss'],
    animations: [LIST_ANIMATION_LATERAL, SLIDE_Y_STATE]
})

export class AportPage implements OnInit, OnDestroy {
    public show: boolean;
    public model = '';
    public loading: boolean;
    public hasFinal: boolean;
    public hasMobile = false;
    public sub: Subscription;

    public form = new FormGroup({
        money: new FormControl(0)
    }, this.validate());

    constructor(
        private router: Router,
        private user: UserService,
        private alert: AlertService,
        private window: WindowService,
    ) { this.hasMobile = window.hasMobile; }

    getOptions() {
        const ret: { prefix?: string; thousands?: string, decimal?: string } = {};

        const prefix = 'R$';

        if (prefix) { ret.prefix = `${prefix} `; }
        ret.decimal = ',';
        ret.thousands = '.';

        return ret;
    }

    public onChange(value: string): void {
        this.form.setValue({ money: value });
    }

    public close() {
        this.router.navigate(['admin', 'investing']);
    }

    public add(value: number) {
        const current = this.form.get('money').value;
        const sum = current + value;
        this.form.setValue({ money: sum });
        this.model = sum;
    }

    public go(route: string): void {
        this.router.navigate(['admin', route]);
    }

    public finalize() {
        this.loading = true;
        const value = this.form.get('money').value;

        const params = { contribution: value };

        this.user.contribution(params)
            .then(() => setTimeout(() => this.hasFinal = true, 500))
            .catch(e => this.alert.show(e.error.message));
    }

    public validate(): ValidatorFn {
        const fn: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
            const value = control.value.money;
            const errors = [];

            if (!value || value <= 100) {
                errors.push('Valor mínimo para aporte é de R$ 100,00');
            }

            return errors.length ? errors : null;
        }

        return fn;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    async ngOnInit() {
        this.sub = this.window.change.subscribe((hasMobile: boolean) => this.hasMobile = hasMobile);
    }
}
