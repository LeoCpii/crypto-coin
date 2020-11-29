import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SLIDE_Y_SIMPLE } from 'src/app/shared/animations/slide.animation';
import { IMAGES } from 'src/app/shared/constants/images.const';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.page.html',
    styleUrls: ['./forgot.page.scss'],
    animations: [SLIDE_Y_SIMPLE]
})

export class ForgotPage implements OnInit {
    public animate = 'ready';

    public form = new FormGroup({
        email: new FormControl(''),
    });

    constructor(private router: Router) { }

    get images() {
        return IMAGES.login;
    }

    public forgot(): void {
        const params = this.form.get('email').value;
    }

    public back(): void {
        this.router.navigate(['auth']);
    }

    ngOnInit() { }
}
