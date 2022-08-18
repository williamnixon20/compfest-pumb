import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    return category;
  }

  findAll() {
    const category = new Category();
    return [category];
  }

  findOne(id: string) {
    const category = new Category();
    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = new Category();
    return category;
  }

  remove(id: string) {
    const category = new Category();
    return category;
  }
}
