import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TasksEntity } from "../entities/tasks.entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { UpdateTaskDto } from "../dto/update-task.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>
  ) {}

  async getAllTasks(id: number): Promise<TasksEntity[]> {
    const tasks = await this.tasksRepository.find({
      where: { category: { id } },
    });
    return tasks;
  }

  async createTask(
    сreateTaskDto: CreateTaskDto,
    id: number
  ): Promise<TasksEntity> {
    const existTask = await this.tasksRepository.findBy({
      category: { id },
      name: сreateTaskDto.name,
    });

    if (existTask.length)
      throw new BadRequestException("This task already exist!");

    const newTask = {
      ...сreateTaskDto,
      category: { id },
    };

    return await this.tasksRepository.save(newTask);
  }

  async getTask(id: number): Promise<TasksEntity> {
    const task = await this.tasksRepository.findOne({
      where: { id },
    });
    if (!task) throw new NotFoundException("Task wasn't found!");
    return task;
  }

  async updateTask(updateTaskDto: UpdateTaskDto, id: number) {
    const task = await this.tasksRepository.findOne({
      where: { id },
    });
    if (!task) throw new NotFoundException("Task wasn't found!");
    return this.tasksRepository.update(id, updateTaskDto);
  }

  async deleteTask(id: number) {
    const task = await this.tasksRepository.findOne({
      where: { id },
    });
    if (!task) throw new NotFoundException("Task wasn't found!");
    return await this.tasksRepository.delete(id);
  }
}
