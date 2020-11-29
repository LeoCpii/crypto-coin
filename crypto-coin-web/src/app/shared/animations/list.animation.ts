import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

export const LIST_ANIMATION_LATERAL = trigger('listAnimation', [
    transition('void => *', [ // each time the binding value changes
        query(':leave', [
            stagger(25, [
                animate('0.4s ease-out', style({ opacity: '0', transform: 'translateX(-20px)' }))
            ])
        ], { optional: true }),
        query(':enter', [
            style({ opacity: '0', transform: 'translateX(-20px)' }),
            stagger(25, [
                animate('0.4s ease-out', style({ opacity: '1', transform: 'translateX(0px)' }))
            ])
        ], { optional: true }),
    ])
]);

export const LIST_ANIMATION_TOP = trigger('listAnimation', [
    transition('void => *', [ // each time the binding value changes
        query(':leave', [
            stagger(25, [
                animate('0.4s ease-out', style({ opacity: '0', transform: 'translateY(-20px)' }))
            ])
        ], { optional: true }),
        query(':enter', [
            style({ opacity: '0', transform: 'translateY(-20px)' }),
            stagger(25, [
                animate('0.4s ease-out', style({ opacity: '1', transform: 'translateY(0px)' }))
            ])
        ], { optional: true }),
    ])
]);