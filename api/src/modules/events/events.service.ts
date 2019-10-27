import { Injectable } from '@nestjs/common';
import { Event } from './models/event';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventInput } from './models/event.input';

@Injectable()
export class EventsService {

    constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>) {
    }

    async getAll() {
        const events = await this.eventRepository.find();
        return events.map(event => {
            event.image = event.image ? (event.image as any as Buffer).toString() : null;
            return event;
        });
    }

    async findById(id: string) {
        const event = await this.eventRepository.findOne(id);
        if (event) {
            event.image = event.image ? (event.image as any as Buffer).toString() : null;
            return event;
        }
        throw new Error('Not found');
    }

    async create(data: EventInput) {
        const event = this.eventRepository.create(data);
        event.created = new Date();
        return await this.eventRepository.save(event);
    }

    async delete(id: string) {
        const event = await this.eventRepository.findOne(id);
        if (event) {
            await this.eventRepository.remove(event);
            return true;
        }
        throw new Error('Not found');
    }
}
