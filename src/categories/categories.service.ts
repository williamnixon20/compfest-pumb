import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto) {
    const category = new Category(0, createCategoryDto.name);
    return category;
  }

  findAll() {
    const category = new Category(0, "Technology");
    return [category];
  }

  findOne(id: number) {
    const category = new Category(id, "Technology");
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = new Category(id, updateCategoryDto.name);
    return category;
  }

  remove(id: number) {
    const category = new Category(id, "Technology");
    return category;
  }
}
