import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AwsService } from 'src/aws/aws.service';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { LecturesService } from 'src/lectures/lectures.service';

@Injectable()
export class ResourcesService {
  constructor(
    private readonly prisma: PrismaService,
    private awsService: AwsService,
    private readonly lectureService: LecturesService
  ) {}

  async create(user: User, createResourceDto, file) {
    if (user.role !== UserRole.TEACHER
      || !await this.lectureService.checkLectureCreator(user.id, createResourceDto.lecture_id)
    ) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const { lecture_id, ...createResourceData } = createResourceDto;
      if (file) {
        const uploadedFileUrl = await this.awsService.upload(file);
        createResourceData['url'] = uploadedFileUrl;
      }
      const resource: Resource = await this.prisma.resource.create({
        data: {
          ...createResourceData,
          lecture: {
            connect: { id: lecture_id },
          },
        },
        select: {
          id: true,
          name: true,
          type: true,
          url: true,
          lecture_id: true,
        },
      });
      return resource;
    } catch (err) {
      throw new BadRequestException("Can't create resource!", err.message);
    }
  }

  async findOne(id: string) {
    try {
      const resource: Resource = await this.prisma.resource.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          name: true,
          type: true,
          url: true,
          lecture_id: true,
        },
      });
      return resource;
    } catch (err) {
      throw new BadRequestException("Can't fetch resource!", err.message);
    }
  }

  async update(user: User, id: string, updateResourceDto: UpdateResourceDto, file) {
    if (user.role !== UserRole.TEACHER
      || !await this.checkResourceCreator(user.id, id)
    ) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      if (file) {
        const uploadedFileUrl = await this.awsService.upload(file);
        updateResourceDto['url'] = uploadedFileUrl;
      }
      const resource: Resource = await this.prisma.resource.update({
        where: { id },
        data: updateResourceDto,
        select: {
          id: true,
          name: true,
          type: true,
          url: true,
          lecture_id: true,
        },
      });
      return resource;
    } catch (err) {
      throw new BadRequestException("Failed to update resource!", err.message);
    }
  }

  async remove(user: User, id: string) {
    if (user.role !== UserRole.TEACHER
      || !await this.checkResourceCreator(user.id, id)
    ) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const resource: Resource = await this.prisma.resource.delete({
        where: { id },
        select: {
          id: true,
          name: true,
          type: true,
          url: true,
          lecture_id: true,
        },
      });
      return resource;
    } catch (err) {
      throw new BadRequestException("Failed to delete resource!", err.message);
    }
  }

  async checkResourceCreator(userId: string, resourceId: string) {
    const { lecture_id: lectureId } = await this.prisma.resource.findUnique({
      where: {
        id: resourceId,
      },
      select: {
        lecture_id: true,
      },
    });
    
    return this.lectureService.checkLectureCreator(userId, lectureId);
  }
}
