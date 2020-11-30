import { Component, OnInit } from '@angular/core';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';
import { SLIDE_Y_SIMPLE } from 'src/app/shared/animations/slide.animation';
import { BrokerService } from 'src/app/shared/services/broker.service';

@Component({
    selector: 'app-investing-page',
    templateUrl: './investing.page.html',
    styleUrls: ['./investing.page.scss'],
    animations: [LIST_ANIMATION_LATERAL, SLIDE_Y_SIMPLE]
})

export class InvestingPage implements OnInit {
    public data: IList[] = [];
    public animate = 'ready';
    public loading = true;
    public arr = new Array(30);

    constructor(private broker: BrokerService) { }

    private async getList() {
        this.data = await this.broker.list();

        setTimeout(() => {
            this.loading = false;
        }, 500);
    }

    async ngOnInit() {
        await this.getList();
    }
}
