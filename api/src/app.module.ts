import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EventsModule } from './modules/events/events.module';

@Module({
    imports: [
        EventsModule,
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            playground: true,
            debug: true,
        }),
    ],
})
export class AppModule { }
