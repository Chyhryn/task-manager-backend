import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";
import { IUserResponse } from "src/types/types";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const existUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existUser) throw new BadRequestException("This email already in use");

    const hashPassword = await argon2.hash(createUserDto.password);

    const user = await this.usersRepository.save({
      email: createUserDto.email,
      password: hashPassword,
    });

    const token = this.jwtService.sign({ email: user.email, id: user.id });

    return {
      id: user.id,
      email: user.email,
      token,
    };
  }

  async remove(id: number) {
    const response = await this.usersRepository.delete(+id);
    console.log(response);
    if (!response.affected) {
      console.log(response);
      return "Something wrong";
    }

    return "User was deleted";
  }

  async findOne(email: string): Promise<UserEntity | undefined> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
