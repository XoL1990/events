import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GoogleMapService {
    private mapApiPromise: Promise<boolean>;

    constructor() {
        this.mapApiPromise = new Promise((resolve) => {
            (window as any).google.maps.event.addDomListener(window, 'load', () => {
                resolve(true);
            });
        });
    }

    getGoogleMapApi() {
        return this.mapApiPromise;
    }
}
