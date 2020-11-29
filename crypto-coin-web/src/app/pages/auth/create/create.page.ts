import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { IMAGES } from 'src/app/shared/constants/images.const';
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

    public form = new FormGroup({
        email: new FormControl(''),
        newPassword: new FormControl(''),
        confirmPassword: new FormControl(''),
    });

    constructor(private router: Router) { }

    get images() {
        return IMAGES.login;
    }

    public back(): void {
        this.router.navigate(['auth']);
    }

    public create(): void {

    }

    ngOnInit() {
        setTimeout(() => {
            // this.listLoading = false;
            this.inputs = INPUTS;
        }, 0);
    }
}
