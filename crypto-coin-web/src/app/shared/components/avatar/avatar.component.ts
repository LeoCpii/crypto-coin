import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-avatar',
    templateUrl: 'avatar.component.html',
    styleUrls: ['avatar.component.scss']
})

export class AvatarComponent implements OnInit {

    @Input() size: 'tiny' | 'small' | 'medium' | 'large' = 'medium';
    @Input() img: string;
    @Input() user: string;
    @Input() showName: boolean;
    @Input() sideName: 'left' | 'right';
    @Input() isLoading = false;
    @Input() icon: string;
    @Input() keepImage: boolean;

    constructor() { }

    ngOnInit() {
    }

    nameInitials() {
        const names: string[] = this.user.trim().split(' ');
        if (!this.user || this.img) {return ''; }
        const firstInitial = names[0].charAt(0);
        let secondInitial;
        if (names.length > 1) {
            secondInitial = names[names.length - 1].charAt(0);
        } else {
            secondInitial = names[0].charAt(1);
        }
        return firstInitial + secondInitial;
    }
}
