import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class PasswordRequirementsService {
    @Output() isValid = new EventEmitter<boolean>();

    constructor() { }
}
