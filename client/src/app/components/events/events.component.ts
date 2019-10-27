import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Event, EventsService } from 'src/app/services/events.service';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

    public events: Event[] = [];
    public displayCreateEventForm = false;

    constructor(private readonly messageService: MessageService, private readonly eventsService: EventsService) { }

    ngOnInit() {
        this.eventsService.getAll().subscribe(events => {
            this.events = events.map((event, index) => {
                if (!event.image) {
                    event.image = 'https://picsum.photos/300?' + index;
                }
                return event;
            });
        });
    }

    public createEvent() {
        this.displayCreateEventForm = true;
    }

    public onCreateEventFormClose(success: boolean) {
        if (success) {
            this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Event created!' });
        }
        this.displayCreateEventForm = false;
    }
}
