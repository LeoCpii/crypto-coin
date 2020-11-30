import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SLIDE_Y_SIMPLE, SLIDE_Y_STATE } from 'src/app/shared/animations/slide.animation';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { IMAGES } from 'src/app/shared/constants/images.const';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.page.html',
    styleUrls: ['./forgot.page.scss'],
    animations: [SLIDE_Y_SIMPLE, SLIDE_Y_STATE]
})

export class ForgotPage implements OnInit {
    public animate = 'ready';
    public isLoading: boolean;
    public hasSendMail: boolean;
    public email: string;

    public form = new FormGroup({
        email: new FormControl(''),
    });

    constructor(
        private router: Router,
        private firebaseAuth: FirebaseAuthService,
        private alert: AlertService,
    ) { }

    get images() {
        return IMAGES.login;
    }

    public forgot(): void {
        this.isLoading = true;
        this.email = this.form.get('email').value;

        this.firebaseAuth.resetPass(this.email)
            .then(() => this.hasSendMail = true)
            .catch(error => this.getError(error))
            .finally(() => this.isLoading = false);
    }

    private getError(e: { error: { message: string; }; message: string; }) {
        this.alert.show(e.error ? e.error.message : e.message)
    }


    public back(): void {
        this.router.navigate(['auth']);
    }

    ngOnInit() { }
}
