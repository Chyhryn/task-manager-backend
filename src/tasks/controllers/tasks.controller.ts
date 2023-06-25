import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { TasksService } from "../services/tasks.service";
import { TasksEntity } from "../entities/tasks.entities";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get("all/:categoryId")
  @UseGuards(JwtAuthGuard)
  async getAllTasks(@Param("categoryId") categoryId: number) {
    return this.tasksService.getAllTasks(categoryId);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getTask(@Param("id") id: number) {
    console.log("TASK ID: ", id);

    return await this.tasksService.getTask(+id);
  }

  @Post(":categoryId")
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Param("categoryId") categoryId: number
  ) {
    return await this.tasksService.createTask(createTaskDto, categoryId);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param("id") id: number
  ) {
    return this.tasksService.updateTask(updateTaskDto, id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param("id") id: number) {
    return this.tasksService.deleteTask(id);
  }
}
