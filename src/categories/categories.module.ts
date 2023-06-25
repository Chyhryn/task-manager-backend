import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { CategoriesController } from "./controllers/categories.controller";
import { CategoriesService } from "./services/categories.service";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { TasksEntity } from "src/tasks/entities/tasks.entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, UserEntity, TasksEntity]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, UsersService, JwtService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
