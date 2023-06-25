import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CategoriesService } from "../services/categories.service";
import { CategoryEntity } from "../entities/category.entity";
import { UsersService } from "src/users/users.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";

@Controller("categories")
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
    private usersService: UsersService
  ) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async getCategories(@Req() req): Promise<CategoryEntity[]> {
    console.log("REQ_USER_ID_in_getCategories: ", req.user.id);
    return await this.categoriesService.getCategories(req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req
  ): Promise<CategoryEntity> {
    console.log("createCategoryDto!!!!___!!!: ", createCategoryDto);
    return await this.categoriesService.createCategory(
      createCategoryDto,
      req.user.id
    );
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getOneCategory(@Param("id") id: number) {
    return await this.categoriesService.getOneCategory(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updateCategory(
    @Param("id") id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return await this.categoriesService.updateCategory(updateCategoryDto, id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async deleteCategory(@Param("id") id: number) {
    return await this.categoriesService.deleteCategory(id);
  }
}
