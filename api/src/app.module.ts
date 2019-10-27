import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EventsModule } from './modules/events/events.module';

@Module({
    imports: [
        EventsModule,
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            playground: process.env.PROD ? false : true,
            debug: process.env.PROD ? false : true,
            introspection: process.env.PROD ? true : false,
        }),
    ],
})
export class AppModule { }
