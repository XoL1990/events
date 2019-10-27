import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Event, EventsService } from 'src/app/services/events.service';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
    public event: Event;
    public mapUrl: SafeResourceUrl;
    public deleteDialog = false;

    constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private eventsService: EventsService) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.router.navigate(['']);
        } else {
            this.eventsService.get(id).pipe(take(1)).subscribe(event => {
                this.event = event;
                if (!event.image) {
                    event.image = 'https://picsum.photos/1000?' + id;
                }
                this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://maps.google.com/maps?q=' + event.address + '&output=embed');
            });
        }
    }

    showDeleteDialog() {
        this.deleteDialog = true;
    }

    deleteEvent() {
        this.eventsService.delete(this.event.id).subscribe(result => {
            this.router.navigate(['']);
        });
    }
}
