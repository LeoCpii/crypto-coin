import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LIST_ANIMATION_LATERAL } from 'src/app/shared/animations/list.animation';

export interface IDetailPage extends ICoinDetailFull { }

@Component({
    selector: 'app-detail-page',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
    animations: [LIST_ANIMATION_LATERAL]
})

export class DetailPage implements OnInit {
    public data: IDetailPage;
    public show: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    get showTwitter() {
        return !!this.data.links.twitter;
    }    

    get showFacebook() {
        return !!this.data.links.facebook;
    }   

    get showReddit() {
        return !!this.data.links.reddit;
    }   

    public close() {
        this.router.navigate(['admin', 'investing']);
    }

    public goReddit() {
        const w = window.open();
        w.location.href = this.data.links.reddit;
    }

    public goFacebook() {
        const w = window.open();
        w.location.href = `https://web.facebook.com/${this.data.links.facebook}/`;;
    }

    public goTwitter() {
        const w = window.open();
        w.location.href = `https://twitter.com/${this.data.links.twitter}`;
    }

    public goGithub() {
        const w = window.open();
        w.location.href = this.data.links.github;
    }

    ngOnInit() {
        this.data = this.route.snapshot.data.data;
        console.log(this.data);
        setTimeout(() => { this.show = true }, 0);
    }
}
