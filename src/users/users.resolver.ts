import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserEntity } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { NewUserInput } from "./dto/new-user.input";
import { IUserResponse } from "src/types/types";

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => UserEntity)
  async getOneUser(@Args("email") email: string): Promise<UserEntity> {
    const user = await this.usersService.findOne(email);
    return user;
  }

  @Mutation(() => UserEntity)
  async createUser(
    @Args("newUserInput") newUserInput: NewUserInput
  ): Promise<IUserResponse> {
    const user = await this.usersService.create(newUserInput);
    return user;
  }
}
