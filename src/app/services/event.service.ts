import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Widget } from '../widget';
import { Event } from '../event';
import { EVENTS } from '../mock-events';

import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

@Injectable()
export class EventService {

    constructor() { }

    public getEvents( startDate: string, endDate: string ): Observable<Widget[]> {
        const MOCK_DATA = EVENTS;
        const events: Event[] = [];
        const timespanStart = moment(startDate);
        const timespanEnd = moment(endDate);
        const widgets: Widget[] = [];

        /**
         * Loop through the events and see if current event is inside date range.
         * If it is then add to array.
         *
         * This would be done on backend.
         */
        for (const key in MOCK_DATA) {
            if (MOCK_DATA.hasOwnProperty(key)) {
                const current_data = MOCK_DATA[key];
                const event_date = moment(current_data.date);
                const range = moment().range(timespanStart, timespanEnd);

                if ( range.contains(event_date) ) {
                    events.push( new Event(
                        current_data.id,
                        current_data.date,
                        current_data.valueSelected
                    ) );
                }
            }
        }

        widgets.push(
            new Widget(
                'example',
                50,
                events
            )
        );

        return Observable.of(widgets);
    }

}
