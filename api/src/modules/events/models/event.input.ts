import { Field, InputType } from 'type-graphql';
import { MaxLength, IsDate, IsEmail, IsBase64 } from 'class-validator';
import { EventType } from './event.type';

@InputType()
export class EventInput {
    @Field()
    title: string;

    @Field()
    @IsDate()
    date: Date;

    @Field()
    description: string;

    @Field({ nullable: true })
    @IsBase64()
    image: string;

    @Field(type => EventType)
    type: EventType;

    @Field()
    @MaxLength(24)
    phone: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    address: string;
}
