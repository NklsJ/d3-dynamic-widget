import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import 'rxjs/Rx';

import { Widget } from '../widget';

import { Event } from '../event';
import { EventService } from '../services/event.service';

import * as d3 from 'd3';

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.css'],
    providers: [
        EventService
    ]
})
export class WidgetComponent implements OnInit, AfterViewInit {
    @Input() widget: Widget;

    public radius: number;
    public border: number;
    public padding: number;
    public startPercent: number;
    public endPercent: number;
    public endPercentText: string;
    public endQuantity: number;
    public endQuantityText: string;

    public formatPercent: d3;

    public foreground: any;
    public front: any;
    public numberText: any;

    public arc: d3;
    public twoPi: number;
    public count: number;
    public step: number;

    public progress: number;
    public over_target: boolean;

    public matchEvents: number;
    public matchEventsArray: number[];
    public allEvents: number;
    public targetPercent: number;
    public targetPercentText: string;

    public picker_s;
    public picker_e;

    public startDate: string;
    public endDate: string;

    constructor(
        private eventService: EventService
    ) {
        this.radius = 90;
        this.border = 18;
        this.padding = 1;
        this.startPercent = 0;
        this.twoPi = Math.PI * 2;
        this.formatPercent = d3.format('.0%');

        // Initial value is 0.
        // Final value calculated later.
        this.endPercent = 0.00;

        this.matchEvents = 0;
        this.matchEventsArray = [];
        this.allEvents = 0;
        this.targetPercent = 0;
    }

    ngOnInit() {
        this.calculateValues();
    }

    ngAfterViewInit() {
        const component = this;
        let progress = this.startPercent;

        (function loops() {
            progress = parseFloat(progress.toFixed(2));
            component.count = parseInt(component.count.toFixed(0));
            component.updateProgress(progress);

            if (component.count > 0) {
                component.count--;
                progress += component.step;
                setTimeout(loops, 10);
            }
        })();
    }

    calculateValues(): void {
        const component = this;
        const data = this.widget.events;

        this.targetPercent = 0.50;
        this.targetPercentText = '50%';

        /**
         * Loop through the events and see if current event is inside date range
         */
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const current_data = data[key];
                const valueSelected = current_data.valueSelected;

                if ( valueSelected > 0 ) {
                    component.matchEvents++;
                    component.allEvents++;
                } else {
                    component.allEvents++;
                }
            }
        }

        this.endPercent = this.matchEvents / this.allEvents;
        this.endPercentText =  Math.round( component.endPercent * 100 ).toString() + '%';

        this.renderGraph();
    }


    /**
     * After values are calculated we finally render the widget.
     * d3 magic happens here.
     *
     * @memberof WidgetComponent
     */
    renderGraph(): void {
        const boxSize = (this.radius + this.padding) * 2;

        this.count = Math.abs((this.endPercent - this.startPercent) / 0.01);
        this.step = this.endPercent < this.startPercent ? -0.01 : 0.01;

        this.arc = d3.arc()
            .startAngle(0)
            .innerRadius(this.radius)
            .outerRadius(this.radius - this.border);

        const parent = d3.select( '#progress-circle-graph' );

        const svg = parent.append('svg')
            .attr('width', boxSize)
            .attr('height', boxSize);

        const g = svg.append('g')
            .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

        const meter = g.append('g')
            .attr('class', 'progress-meter');

        meter.append('path')
            .attr('class', 'progress-circle-background')
            .attr('fill', '#ccc')
            .attr('fill-opacity', 0.5)
            .attr('d', this.arc.endAngle(this.twoPi));

        this.foreground = meter.append('path')
            .attr('class', 'foreground')
            .attr('fill', '#15164e')
            .attr('fill-opacity', 1)
            .attr('stroke', '#15164e')
            .attr('stroke-width', 1)
            .attr('stroke-opacity', 1);

        this.front = meter.append('path')
            .attr('class', 'progress-circle-foreground')
            .attr('fill', '#15164e')
            .attr('fill-opacity', 1);

        this.numberText = meter.append('text')
            .attr('fill', '#15164e')
            .attr('text-anchor', 'middle')
            .attr('class', 'progress-circle-text')
            .attr('dy', '.35em');
    }

    updateProgress(progress): void {
        this.foreground.attr('d', this.arc.endAngle(this.twoPi * progress));
        this.front.attr('d', this.arc.endAngle(this.twoPi * progress));
        this.numberText.text(this.formatPercent(progress));
    }
}
