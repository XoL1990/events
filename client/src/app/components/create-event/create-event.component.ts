import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/components/common/selectitem';
import { FileUpload } from 'primeng/fileupload';
import { take } from 'rxjs/operators';
import { EventInput, EventsService, EventType } from 'src/app/services/events.service';
import { GoogleMapService } from 'src/app/services/google-map.service';

declare var google: any;

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

    @ViewChild('imageUpload', { static: true })
    imageUpload: FileUpload;

    @ViewChild('addressInput', { static: true })
    addressInput: ElementRef;

    public phoneKeyRegex = /[0-9\+\-\ $]+/;

    public eventForm: FormGroup;
    public types: SelectItem[];
    public image: string;

    constructor(private fb: FormBuilder, private eventsService: EventsService, private googleMapService: GoogleMapService) {
    }

    @Input()
    set visiblity(visible: boolean) {
        if (visible) {
            this.clear();
        }
    }

    @Output()
    closeClick = new EventEmitter<boolean>();

    ngOnInit() {
        this.eventForm = this.fb.group({
            title: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(255)])),
            date: new FormControl('', Validators.required),
            description: new FormControl(''),
            type: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(24)])),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.maxLength(255)])),
            address: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(255)]))
        });

        this.types = Object.keys(EventType).filter(key => isNaN(Number(key))).map(key => {
            if (EventType[key] === EventType.None) {
                return { label: 'Select type', value: null };
            }
            return { label: key, value: key };
        });

        this.googleMapService.getGoogleMapApi().then(() => {
            this.googleApiInitialize();
        });
    }

    googleApiInitialize() {
        const autocoplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement);
    }

    public onSubmit() {
        if (this.eventForm.valid) {
            const data: EventInput = this.eventForm.value;
            data.image = this.image;
            this.eventsService.create(data).pipe(take(1)).subscribe(result => {
                if (result) {
                    this.close(true);
                }
            });
        }
    }

    public onSelectImage(event: { files: File[] }) {
        if (event.files && event.files.length > 0) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(event.files[0]);
            fileReader.onload = () => {
                this.image = fileReader.result as string;
            };
        }
    }

    public onRemoveImage() {
        this.image = null;
    }

    public onClearImage() {
        this.image = null;
    }

    public close(success = false) {
        this.closeClick.emit(success);
    }

    public clear() {
        this.eventForm.reset();
        this.imageUpload.clear();
    }
}
