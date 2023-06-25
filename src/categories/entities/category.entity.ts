import { Field, ID, ObjectType } from "@nestjs/graphql";

import { TasksEntity } from "src/tasks/entities/tasks.entities";
import { UserEntity } from "src/users/entities/user.entity";

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
@ObjectType()
@Entity("categories")
export class CategoryEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar" })
  name: string;

  @Field()
  @CreateDateColumn()
  dateCreated: Date;

  @Field(() => [TasksEntity])
  @OneToMany(() => TasksEntity, (task) => task.category, {
    onDelete: "CASCADE",
  })
  tasks: TasksEntity[];

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.categories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: UserEntity;
}
