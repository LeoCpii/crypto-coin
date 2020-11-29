import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';

// lIB

// Service

// Guard

// Directive
import { SafeValueDirective } from './directives/safe-value.directive';
import { MoneyPipe } from './pipes/money.pipe';

// Pipes

const SERVICES = [];

const LIBS = [];

const GUARDS = [];

const DIRECTIVES = [SafeValueDirective];

const PIPES = [MoneyPipe];

@NgModule({
    imports: [ComponentsModule],
    exports: [ComponentsModule, ...DIRECTIVES, ...PIPES],
    declarations: [...DIRECTIVES, ...PIPES],
    providers: [
        ...SERVICES,
        ...GUARDS,
        ...LIBS
    ],
})
export class SharedModule { }
