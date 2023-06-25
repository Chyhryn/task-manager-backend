// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { UserEntity } from "src/users2/entities/user.entity";
// // import { CreateUserInput } from "src/users/inputs/createUser.input";
// import { Repository } from "typeorm";

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>
//   ) {}
//   async createUser(user: UserEntity): Promise<UserEntity> {
//     return await this.userRepository.save({ ...user });
//   }
//   async getUser(id: number): Promise<UserEntity> {
//     return await this.userRepository.findOne({ where: { id } });
//   }
//   // async getAllUsers(): Promise<UserEntity[]> {
//   //   return await this.userRepository.find();
//   // }
//   // async deleteUser(id: number): Promise<any> {
//   //   console.log("DELETE LOG: ", id);
//   //   const user = await this.userRepository.findOne({ where: { id } });
//   //   console.log("DELETE USER: ", user);

//   //   return await this.userRepository.delete(user);
//   // }
// }
