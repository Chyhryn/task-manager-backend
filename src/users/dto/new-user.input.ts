import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";

@InputType()
export class NewUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8, { message: "Password should be more then 7 symbols" })
  password: string;
}
