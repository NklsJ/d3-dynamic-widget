export class Event {
    public id: number;
    public date: string;
    public valueSelected: number;

    constructor (
        id: number,
        date: string,
        valueSelected: number
    ) {
        this.id = id;
        this.date = date;
        this.valueSelected = valueSelected;
    }
}
