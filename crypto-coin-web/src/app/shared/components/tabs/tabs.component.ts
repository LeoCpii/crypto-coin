import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, NavigationError } from '@angular/router';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.component.html',
    styleUrls: ['tabs.component.scss']
})

export class TabsComponent implements OnInit, AfterViewInit {

    public activeRoute: string;

    @Input() tabs: Array<{ label: string, route: string }>;
    @Input() activeTab: string;
    @Input() isLoading = false;
    @Input() paddingBottom = false;

    @Output() clickEvent = new EventEmitter();

    @ViewChild('select', { static: false }) select: ElementRef<HTMLDivElement>;

    constructor(private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.activeRoute = window.location.pathname.split('/')[2];
                this.activeTab = this.activeRoute;
                this.initTab();
            }
            if (event instanceof NavigationError) {

            }
        });
    }

    ngOnInit() {
        if (!this.activeTab) {
            this.activeRoute = window.location.pathname.split('/')[2];
        }
    }

    ngAfterViewInit() {
        if (!this.isLoading) {
            this.initTab();
        }
    }

    clickTab(event: MouseEvent, route: string) {
        this.activeRoute = route;
        this.activeTab = route;
        this.select.nativeElement.style.width = `${event.target['offsetWidth']}px`;
        this.select.nativeElement.style.left = `${event.target['offsetLeft']}px`;
        this.clickEvent.emit(route);
    }

    initTab() {
        const element = document.querySelector(`#${this.activeTab || this.activeRoute}`);
        if (element) {
            this.select.nativeElement.style.left = `${element['offsetLeft']}px`;
            this.select.nativeElement.style.width = `${element['offsetWidth']}px`;
        }
    }

    selectTab() {
        const element = document.querySelector(`#${this.activeRoute}`);
        this.select.nativeElement.style.left = `${element['offsetLeft']}px`;
        this.select.nativeElement.style.width = `${element['offsetWidth']}px`;
    }
}
