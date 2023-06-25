import { Field, ID, ObjectType } from "@nestjs/graphql";
import { CategoryEntity } from "src/categories/entities/category.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity("tasks")
export class TasksEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  dateStart: Date;

  @Field()
  @Column()
  dateEnd: Date;

  @Field(() => CategoryEntity)
  @ManyToOne(() => CategoryEntity, (category) => category.tasks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "category_id" })
  category: CategoryEntity;
}
