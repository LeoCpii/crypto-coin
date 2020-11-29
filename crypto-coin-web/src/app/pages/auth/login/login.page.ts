import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SLIDE_Y_SIMPLE } from 'src/app/shared/animations/slide.animation';
import { IMAGES } from 'src/app/shared/constants/images.const';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    animations: [SLIDE_Y_SIMPLE]
})

export class LoginPage implements OnInit {
    public animate = 'ready';

    public form = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private router: Router) { }

    get images() {
        return IMAGES.login;
    }

    public login(): void {
        const params = {
            email: this.form.get('email').value,
            password: this.form.get('password').value,
        }

        console.log(params);
    }

    public create(): void {
        this.router.navigate(['auth', 'create-user']);
    }

    public forgot(): void {
        this.router.navigate(['auth', 'forgot-password']);
    }

    ngOnInit() { }
}
