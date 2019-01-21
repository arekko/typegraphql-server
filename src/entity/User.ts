import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  // @Field()
  // async name(@Root() parent: User): string {
  //   return `${parent.firstname} ${parent.lastname}`;
  // }

  @Column()
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;
}
