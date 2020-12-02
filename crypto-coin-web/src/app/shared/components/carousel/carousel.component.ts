import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
    selector: 'app-carousel',
    templateUrl: 'carousel.component.html',
    styleUrls: ['carousel.component.scss']
})

export class CarouselComponent implements OnInit {
    @Input() index = 0;
    @Output() getindex = new EventEmitter<number>();

    public config: SwiperConfigInterface = {
        a11y: true,
        direction: 'horizontal',
        loop: false,
        effect: 'slide',
        slidesPerView: 1,
        keyboard: true,
        mousewheel: true,
        scrollbar: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            clickable: true,
            el: '.swiper-pagination',
            hideOnClick: false,
        }
    };

    constructor() { }

    public indexChange(index: number) {
        this.getindex.emit(index);
    }

    ngOnInit() { }
}
