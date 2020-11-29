import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';

// lIB

// Service

// Guard

// Directive
import { SafeValueDirective } from './directives/safe-value.directive';
import { ResizeDirective } from './directives/resize.directive';

// Pipes
import { MoneyPipe } from './pipes/money.pipe';

const SERVICES = [];

const LIBS = [];

const GUARDS = [];

const DIRECTIVES = [SafeValueDirective, ResizeDirective];

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
