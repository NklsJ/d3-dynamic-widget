import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Widget } from '../widget';
import { WidgetService } from '../services/widget.service';

import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

import * as Pikaday from 'pikaday';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css'],
    providers: [
        WidgetService
    ]
})
export class LandingComponent implements OnInit {
    public widgets: Widget[];
    public picker_s;
    public picker_e;

    private ref: ChangeDetectorRef;

    public startDate: string;
    public endDate: string;

    constructor(
        private widgetService: WidgetService,
        private detref: ChangeDetectorRef
    ) {
        this.ref = detref;
        this.widgets = [];

        this.startDate = '2017-08-01';
        this.endDate = '2017-09-01';
    }

    ngOnInit() {
        const component = this;

        this.getWidgets();

        const picker_s = new Pikaday({
            field: document.getElementById('datepicker-start'),
            format: 'YYYY-MM-DD',
            firstDay: 1,
            onSelect: function() {
                component.startDate = this.toString();
            }
        });
        const picker_e = new Pikaday({
            field: document.getElementById('datepicker-end'),
            format: 'YYYY-MM-DD',
            firstDay: 1,
            onSelect: function() {
                component.endDate = this.toString();
            }
        });
    }

    getWidgets(): void {
        this.widgetService.getWidgets( this.startDate, this.endDate )
            .subscribe(
                result => {
                    this.widgets = result;
                    this.ref.detectChanges();
                },
                err => {
                    console.log('Error: %s', err);
                }
            );
    }

    refreshWidget(): void {
        this.getWidgets();
    }
}
