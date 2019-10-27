import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

export enum EventType {
    None,
    Sport,
    Culture,
    Health,
}

export interface Event {
    id: string;
    title: string;
    date: Date;
    description: string;
    image: string;
    type: EventType;
    phone: string;
    email: string;
    address: string;
}

export interface EventInput {
    title: string;
    date: Date;
    description: string;
    image: string;
    type: EventType;
    phone: string;
    email: string;
    place: string;
}

const listQuery = gql`
    query {
        events {
            id
            title
            date
            image
            type
            address
        }
    }
`;

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    constructor(private readonly apollo: Apollo) {
    }

    getAll() {
        return this.apollo.watchQuery<{ events: Event[] }>({ query: listQuery })
            .valueChanges.pipe(map(({ data }) => data.events));
    }

    get(id: string) {
        const query = gql`
            query Event($id: String!) {
                event(id: $id) {
                    id
                    title
                    date
                    description
                    image
                    type
                    phone
                    email
                    address
                }
            }
        `;

        return this.apollo.query<{ event: Event }>({
            query,
            variables: {
                id
            }
        }).pipe(map(({ data }) => data.event));
    }

    create(data: EventInput) {
        const mutation = gql`
            mutation CreateEvent($data: EventInput!) {
                createEvent(data: $data) {
                    id
                    title
                    date
                    image
                    type
                    address
                }
            }
        `;

        return this.apollo.mutate<{ createEvent: Event }>({
            mutation,
            variables: {
                data
            },
            update: (store, result) => {
                const storeData = store.readQuery<{ events: Event[] }>({ query: listQuery });
                storeData.events.push(result.data.createEvent);
                store.writeQuery({ query: listQuery, data: storeData });
            }
        }).pipe(map(result => result.data.createEvent));
    }

    delete(id: string) {
        const mutation = gql`
            mutation DeleteEvent($id: String!) {
                deleteEvent(id: $id)
            }
        `;

        return this.apollo.mutate<{ deleteEvent: boolean }>({
            mutation,
            variables: {
                id
            },
            update: (store, result) => {
                if (result.data.deleteEvent) {
                    const storeData = store.readQuery<{ events: Event[] }>({ query: listQuery });
                    const events = storeData.events.filter(event => {
                        return event.id !== id;
                    });
                    store.writeQuery({ query: listQuery, data: { events } });
                }
            }
        }).pipe(map(result => result.data.deleteEvent));
    }
}
