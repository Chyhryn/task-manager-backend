import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CategoryEntity } from "../entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { TasksEntity } from "src/tasks/entities/tasks.entities";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>
  ) // @InjectRepository(UserEntity)
  // private readonly userRepository: Repository<UserEntity>,
  // @InjectRepository(TasksEntity)
  // private readonly tasksRepository: Repository<TasksEntity>
  {}

  async getCategories(id: number): Promise<CategoryEntity[]> {
    const categories = await this.categoriesRepository.find({
      where: { user: { id } },
      relations: { tasks: true },
    });
    console.log("CATEGORIES!!!!: ", categories);

    return categories;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    id: number
  ): Promise<CategoryEntity> {
    console.log("USER_ ID in service: ", id);

    const existCategory = await this.categoriesRepository.findBy({
      user: { id },
      name: createCategoryDto.name,
    });

    console.log("existCategory!!!!: ", existCategory);

    if (existCategory.length)
      throw new BadRequestException("This category already exist!");

    const newCategory = {
      ...createCategoryDto,
      user: { id },
    };

    console.log("CATEgORY!!!!: ", newCategory);

    // const user = await this.userRepository.findOne({ where: { id } });
    // console.log("HERE iS USER: ", user);

    // const newCategory = this.categoriesRepository.create({
    //   ...category,
    // });
    // newCategory.user = user;

    return await this.categoriesRepository.save(newCategory);

    // const userTest = await this.userRepository.find({
    //   relations: { categories: true },
    // });
    // console.log("HERE iS USER: ", userTest);

    // return test;
    // return newCategory;
  }

  async getOneCategory(id: number): Promise<CategoryEntity> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
    });
    if (!category) throw new NotFoundException("Category wasn't found!");

    return category;
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto, id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
    });

    if (!category) throw new NotFoundException("Category wasn't found!");

    return this.categoriesRepository.update(id, updateCategoryDto);
  }

  async deleteCategory(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
    });
    if (!category) throw new NotFoundException("Category wasn't found!");
    return await this.categoriesRepository.delete(id);
  }
}
