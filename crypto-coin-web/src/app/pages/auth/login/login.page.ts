import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SLIDE_Y_SIMPLE } from 'src/app/shared/animations/slide.animation';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { IMAGES } from 'src/app/shared/constants/images.const';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
import { SecurityService } from 'src/app/shared/services/security.service';

import * as moment from 'moment';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    animations: [SLIDE_Y_SIMPLE]
})

export class LoginPage implements OnInit {
    public animate = 'ready';
    public isLoading: boolean;

    public form = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(
        private router: Router,
        private security: SecurityService,
        private firebaseAuth: FirebaseAuthService,
        private alert: AlertService,
    ) { }

    get images() {
        return IMAGES.login;
    }

    public login(): void {
        this.isLoading = true;

        const params = {
            email: this.form.get('email').value,
            password: this.form.get('password').value,
        }

        this.security.login({ email: params.email })
            .then(async data => {
                await this.firebaseAuth.signIn(params.email, params.password);
                return data;
            })
            .then(data => this.redirect(data.token))
            .catch(error => this.getError(error))
            .finally(() => this.isLoading = false);
    }

    private redirect(token: string) {
        this.security.saveToken(token);
        this.router.navigate(['admin']);
    }

    private getError(e: { error: { message: string; }; message: string; }) {
        this.alert.show(e.error ? e.error.message : e.message)
    }

    public create(): void {
        this.router.navigate(['auth', 'create-user']);
    }

    public forgot(): void {
        this.router.navigate(['auth', 'forgot-password']);
    }

    ngOnInit() {
        const hoje = moment().unix();
        const ontem = moment().subtract(1, 'day').unix();

        console.log(hoje, ontem);
    }
}
