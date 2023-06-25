import { Module } from "@nestjs/common";
import { TasksService } from "./services/tasks.service";
import { TasksController } from "./controllers/tasks.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksEntity } from "./entities/tasks.entities";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { CategoriesService } from "src/categories/services/categories.service";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/users/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksEntity, CategoryEntity, UserEntity]),
  ],
  controllers: [TasksController],
  providers: [TasksService, CategoriesService, JwtService],
})
export class TasksModule {}
