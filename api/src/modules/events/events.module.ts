import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsResolver } from './events.resolver';
import { EventsService } from './events.service';
import { Event } from './models/event';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [Event],
            synchronize: true,
            charset: 'utf8mb4',
        }),
        TypeOrmModule.forFeature([Event]),
    ],
    providers: [EventsService, EventsResolver],
})
export class EventsModule {

}
