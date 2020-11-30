import { getParseErrors } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { IMAGES } from 'src/app/shared/constants/images.const';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
import { SecurityService } from 'src/app/shared/services/security.service';
import { INPUTS } from './create.consts';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class CreatePage implements OnInit {
    public animate = 'ready';
    public inputs = [];
    public isLoading: boolean;
    public error: string;

    public form = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        newPassword: new FormControl(''),
        confirmPassword: new FormControl(''),
    });

    constructor(
        private router: Router,
        private firebaseAuth: FirebaseAuthService,
        private security: SecurityService,
        private alert: AlertService,
    ) { }

    get images() {
        return IMAGES.login;
    }

    public back(): void {
        this.router.navigate(['auth']);
    }

    public create(): void {
        this.isLoading = true;

        const params = {
            name: this.form.get('name').value,
            email: this.form.get('email').value,
            password: this.form.get('confirmPassword').value,
        }

        this.security.register({ name: params.name, email: params.email })
            .then(async data => {
                await this.firebaseAuth.signUp(params.email, params.password);
                return data;
            })
            .then(data => this.redirect(data.token))
            .catch(error => this.getError(error))
            .finally(() => this.isLoading = false);
    }

    private redirect(token: string): void {
        this.security.saveToken(token);
        this.router.navigate(['admin']);
    }
    
    private getError(e: { error: { message: string; }; message: string; }) {
        this.alert.show(e.error ? e.error.message : e.message)
    }

    ngOnInit() {
        setTimeout(() => {
            this.inputs = INPUTS;
        }, 0);
    }
}
