import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    console.log("createUserDto: ", createUserDto);

    return this.usersService.create(createUserDto);
  }

  // @Get("user")
  // findOne(@Body("email") email: string) {
  //   return this.usersService.findOne(email);
  // }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async remove(@Param("id") id: number): Promise<string> {
    console.log(`Delete params id is ${id}`);

    return await this.usersService.remove(id);
  }
}
