import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm'


@ObjectType()
@InputType('ReviewInput')
@Entity('Review')
export class Review extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @ObjectIdColumn() //Special decorator, to tell that this collumn represent an unique generated ID
  id?: ObjectID

  @Field({ nullable: true })
  @Column('text') 
  comment?: string

  @Field()
  @Column()
  starRating?: number

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field()
  @Column()
  roomId?: string

  @Field()
  @Column()
  userId?: string
}

