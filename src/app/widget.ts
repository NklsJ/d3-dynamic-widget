import { Event } from './event';

export class Widget {
    public name: string;
    public target: number;
    public events: Event[];

    constructor (
        name: string,
        target: number,
        events: Event[]
    ) {
        this.name = name;
        this.target = target;
        this.events = events;
    }
}
