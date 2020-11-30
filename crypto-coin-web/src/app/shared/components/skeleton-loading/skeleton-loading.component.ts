import { Component, OnInit, Input } from '@angular/core';

type TypesValid = 'avatar' | 'strip' | 'box';
type SizesValid = 'tiny' | 'small' | 'medium' | 'large';

@Component({
    selector: 'app-skeleton-loading',
    templateUrl: 'skeleton-loading.component.html',
    styleUrls: ['skeleton-loading.component.scss']
})

export class SkeletonLoadingComponent implements OnInit {

    @Input() type: TypesValid;
    @Input() size: SizesValid = 'medium';

    constructor() { }

    ngOnInit() { }
}
