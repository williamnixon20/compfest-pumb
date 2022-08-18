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

@Injectable()
export class ResourcesService {
  constructor(
    private readonly prisma: PrismaService,
    private awsService: AwsService,
  ) {}

  async create(user: User, createResourceDto, file) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      if (file) {
        const uploadedFileUrl = await this.awsService.upload(file);
        createResourceDto['url'] = uploadedFileUrl;
      }
      const resource: Resource = await this.prisma.resource.create({
        data: createResourceDto,
      });
      return resource;
    } catch (err) {
      throw new BadRequestException("Can't create resource!", err.message);
    }
  }

  findAll() {
    return this.prisma.resource.findMany();
  }

  async findOne(id: number) {
    try {
      const resource: Resource = await this.prisma.resource.findUniqueOrThrow({
        where: { id },
      });
      return resource;
    } catch (err) {
      throw new BadRequestException("Can't fetch resource!", err.message);
    }
  }

  async update(user: User, id: number, updateResourceDto: UpdateResourceDto, file) {
    if (user.role !== UserRole.TEACHER) {
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
      });
      return resource;
    } catch (err) {
      throw new BadRequestException("Failed to update resource!", err.message);
    }
  }

  async remove(user: User, id: number) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const resource: Resource = await this.prisma.resource.delete({
        where: { id },
      });
      return resource;
    } catch (err) {
      throw new BadRequestException("Failed to delete resource!", err.message);
    }
  }
}
