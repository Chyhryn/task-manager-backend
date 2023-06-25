import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(8, { message: "Password should be more then 7 symbols" })
  password: string;
}
