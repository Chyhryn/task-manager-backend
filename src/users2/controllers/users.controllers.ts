// import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
// import { UserService } from "../services/user.service";
// import { UserEntity } from "../entities/user.entity";

// @Controller("users")
// export class UsersController {
//   constructor(private readonly usersService: UserService) {}

//   @Post()
//   async createUser(@Body() body: UserEntity): Promise<UserEntity> {
//     const newUser = await this.usersService.createUser(body);
//     return newUser;
//   }

//   // @Delete(":id")
//   // async deleteUser(@Param("id") id: number): Promise<any> {
//   //   console.log(id);
//   //   const res = await this.usersService.deleteUser(id);
//   //   console.log(res);
//   //   return res;
//   // }
// }
