import { LIST_ANIMATION_LATERAL } from './../../animations/list.animation';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IRequirement } from './password-requirements-item/password-requirements-item.component';
import { REQUIRIMENTS } from './password-requirements.consts';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PasswordRequirementsService } from './password-requirement.service';

interface IForm {
    newPassword: string;
    confirmPassword: string;
}

@Component({
    selector: 'app-password-requirements',
    templateUrl: 'password-requirements.component.html',
    styleUrls: ['password-requirements.component.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class PasswordRequirementsComponent implements OnInit, OnDestroy {
    @Input() form: FormGroup;

    public subscribe: Subscription;
    public data: IRequirement[] = [];
    public isValid: boolean;

    constructor(private validator: PasswordRequirementsService) { }

    private validate(data: IForm) {
        const pass = data.newPassword;
        const confirm = data.confirmPassword;

        this.data[0].active = this.isValidLength(pass);
        this.data[1].active = this.hasNumber(pass);
        this.data[2].active = this.hasUpperCase(pass);
        this.data[3].active = pass && pass === confirm;

        const isValid = this.data.filter(item => !item.active).length === 0;

        this.validator.isValid.emit(isValid);
    }

    private isValidLength(pass: string): boolean {
        return pass.length >= 6 && pass.length <= 10;
    }

    private hasNumber(pass: string): boolean {
        return /\d/.test(pass);
    }

    private hasUpperCase(pass: string): boolean {
        return (/[A-Z]/.test(pass));
    }

    private reset() {
        if (this.data.length) {
            this.data.forEach(item => item.active = false);
        }
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
        this.reset();
    }

    ngOnInit() {
        this.subscribe = this.form.valueChanges.subscribe(data => {
            if (this.data.length) { this.validate(data); }
        });

        setTimeout(() => { this.data = REQUIRIMENTS; }, 0);
    }

}
