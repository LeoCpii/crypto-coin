import { trigger, style, transition, animate, state } from '@angular/animations';

export const SLIDE_Y_SIMPLE = trigger('initial', [
    state('ready', style({ opacity: 1 })),
    transition('void => ready', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms 0s ease-in'),
    ])
]);

export const SLIDE_X_L_TO_R = trigger('slide_XLR', [
    state('ready', style({ opacity: 1 })),
    transition('void => ready', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('200ms 0s ease-in'),
    ]),
]);

export const SLIDE_Y_EVENT = trigger('slide_Y_event', [
    state('open', style({ opacity: 1, transform: 'translateY(0px)' })),
    state('closed', style({ opacity: '0', transform: 'translateY(-20px)' })),
    transition('open => closed', [
        animate('0.2s ease-out', style({ opacity: '0', transform: 'translateY(-20px)' }))
    ]),
    transition('closed => open', [
        animate('0.2s ease-out', style({ opacity: 1, transform: 'translateY(0px)' }))
    ]),
]);