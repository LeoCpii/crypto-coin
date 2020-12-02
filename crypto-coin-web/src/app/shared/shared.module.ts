import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';

// lIB
import { JWT } from './lib/jwt.lib';

// Service
import { SecurityService } from './services/security.service';
import { MonitorService } from './services/monitor.service';
import { BrokerService } from './services/broker.service';
import { UserService } from './services/user.service';

// Guard

// Directive
import { SafeValueDirective } from './directives/safe-value.directive';
import { ResizeDirective } from './directives/resize.directive';
// Pipes
import { MoneyPipe } from './pipes/money.pipe';

const SERVICES = [SecurityService, MonitorService, BrokerService, UserService];

const LIBS = [JWT];

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
