import { Event } from './models/event';
import { EventsService } from './events.service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { EventInput } from './models/event.input';

@Resolver()
export class EventsResolver {

    constructor(private readonly eventsService: EventsService) {
    }

    @Query(() => [Event])
    async events(): Promise<Event[]> {
        return await this.eventsService.getAll();
    }

    @Query(() => Event)
    async event(@Args('id') id: string): Promise<Event> {
        return await this.eventsService.findById(id);
    }

    @Mutation(() => Event)
    async createEvent(@Args('data') data: EventInput) {
        return await this.eventsService.create(data);
    }

    @Mutation(() => Boolean)
    async deleteEvent(@Args('id') id: string) {
        return await this.eventsService.delete(id);
    }
}
