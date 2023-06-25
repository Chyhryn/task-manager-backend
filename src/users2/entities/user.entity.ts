// // import { Field, ID, ObjectType } from "@nestjs/graphql";
// import { CategoryEntity } from "src/categories/entities/category.entity";
// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// // @ObjectType()
// @Entity("users")
// export class UserEntity {
//   // @Field(() => ID)
//   @PrimaryGeneratedColumn()
//   id: number;

//   // @Field()
//   @Column()
//   email: string;

//   // @Field({ nullable: true })
//   @Column({ nullable: true })
//   role: string;

//   // @Field(() => CategoryEntity)
//   @OneToMany(() => CategoryEntity, (category) => category.user, {
//     onDelete: "CASCADE",
//   })
//   categories: CategoryEntity[];
// }
