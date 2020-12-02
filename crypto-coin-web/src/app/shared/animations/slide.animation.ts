import { trigger, style, transition, animate, state, group, query, animateChild } from '@angular/animations';

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

export const SLIDE_Y_STATE = trigger('animation', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-30%)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translate(0)' })),
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease-out', style({ opacity: 0 })),
    ]),
]);

export const SLIDE_X_STATE = trigger('animationX', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30%)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translate(0)' })),
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease-out', style({ opacity: 0 })),
    ]),
]);


export const SLIDE_Y_SIMPLE_NOT_OPACITY = trigger('initial', [
    state('ready', style({ opacity: 1 })),
    transition('void => ready', [
        style({ transform: 'translateY(-20px)' }),
        animate('300ms 0s ease-out'),
        group([
            query('@slide_XLR', animateChild(), { optional: true }),
            query('@slide_XRL', animateChild(), { optional: true }),
        ]),
    ])
]);
