import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { IUser, IUserResponse } from "src/types/types";
import { UserEntity } from "src/users/entities/user.entity";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    const verifyPassword = await argon2.verify(user.password, password);

    if (!user || !verifyPassword) {
      throw new UnauthorizedException("User validation faild");
    }

    return user;
  }

  async login(user: IUser): Promise<IUserResponse> {
    const { email, id } = user;
    return {
      id,
      email,
      token: this.jwtService.sign({ id, email }),
    };
  }
}
