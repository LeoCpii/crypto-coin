import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-form-log',
    templateUrl: './form-log.component.html',
    styleUrls: ['./form-log.component.scss']
})

export class FormLogComponent {
    @Input() form: FormGroup;
    @Input() type: string;
}
