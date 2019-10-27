import { IsDate, IsEmail, MaxLength } from 'class-validator';
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EventType } from './event.type';

registerEnumType(EventType, {
    name: 'EventType',
    description: 'Type of event',
});

@ObjectType()
@Entity()
export class Event {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    @IsDate()
    created: Date;

    @Field()
    @Column()
    title: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    @IsDate()
    date: Date;

    @Field()
    @Column({ type: 'text' })
    description: string;

    @Field({ nullable: true })
    @Column({ nullable: true, type: 'longblob' })
    image: string;

    @Field(type => EventType)
    @Column({
        type: 'enum',
        enum: EventType,
        default: EventType.None,
    })
    type: EventType;

    @Field()
    @Column({ length: 24 })
    @MaxLength(24)
    phone: string;

    @Field()
    @Column()
    @IsEmail()
    email: string;

    @Field()
    @Column()
    address: string;
}
