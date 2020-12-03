import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { COLORS_CHART } from '../../../shared/constants/colors.const';
import { COLORS, IColors } from './color.const';

@Component({
    selector: 'app-color-page',
    templateUrl: './color.page.html',
    styleUrls: ['./color.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class ColorPage implements OnInit {
    public show: boolean;

    constructor(
        private utils: UtilsService,
        private toasty: ToastyService
    ) { }

    public get colors(): IColors[] {
        return COLORS;
    }

    public get color_chart() {
        return COLORS_CHART;
    }

    public getClass(name: string): string {
        const color = name.replace('$', '');
        return `color--${color}`;
    }

    public clip(color: IColors): void {
        this.utils.clipboard(color.name);
        this.toasty.show({ text: `${color.name}: copiado!` });
    }

    ngOnInit() {
        setTimeout(() => { this.show = true; }, 0);
    }
}
