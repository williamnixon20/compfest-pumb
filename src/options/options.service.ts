import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionsService } from 'src/questions/questions.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Option } from './entities/option.entity';

@Injectable()
export class OptionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly questionService: QuestionsService,
  ) {}

  async create(user: User, createOptionDto: CreateOptionDto) {
    if (user.role !== UserRole.TEACHER
      || !await this.questionService.checkQuestionCreator(user.id, createOptionDto.question_id)
    ) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const option: Option = await this.prisma.option.create({
        data: createOptionDto,
      });
      return option;
    } catch (err) {
      throw new BadRequestException("Can't create option!", err.message);
    }
  }

  async findOne(id: string) {
    try {
      const option: Option = await this.prisma.option.findUniqueOrThrow({
        where: { id },
      });
      return option;
    } catch (err) {
      throw new BadRequestException("Can't fetch option!", err.message);
    }
  }

  async update(user: User, id: string, updateOptionDto: UpdateOptionDto) {
    if (user.role !== UserRole.TEACHER
      || !await this.checkOptionCreator(user.id, id)
    ) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const option: Option = await this.prisma.option.update({
        where: { id },
        data: updateOptionDto,
      });
      return option;
    } catch (err) {
      throw new BadRequestException("Failed to update option!", err.message);
    }
  }

  async remove(user: User, id: string) {
    if (user.role !== UserRole.TEACHER
      || !await this.checkOptionCreator(user.id, id)
    ) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const option: Option = await this.prisma.option.delete({
        where: { id },
      });
      return option;
    } catch (err) {
      throw new BadRequestException("Failed to delete option!", err.message);
    }
  }

  async checkOptionCreator(userId: string, optionId: string) {
    const { question_id: questionId } = await this.prisma.option.findUnique({
      where: {
        id: optionId,
      },
      select: {
        question_id: true,
      },
    });
    
    return this.questionService.checkQuestionCreator(userId, questionId);
  }
}
