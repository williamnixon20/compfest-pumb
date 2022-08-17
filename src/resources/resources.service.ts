import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class ResourcesService {
  constructor(
    private readonly prisma: PrismaService,
    private awsService: AwsService,
  ) {}

  async create(createResourceDto, file, user) {
    // if (user.role !== UserRole.TEACHER) {
    //   throw new ForbiddenException(
    //     'You are not allowed to access this resource!',
    //   );
    // }
    const { lecture_id, ...createResourceData } = createResourceDto;
    if (file) {
      const uploadedFileUrl = await this.awsService.upload(file);
      createResourceData['url'] = uploadedFileUrl;
    }
    return await this.prisma.resource.create({
      data: {
        ...createResourceData,
        lecture: {
          connect: { id: +lecture_id },
        },
      },
    });
  }

  findAll() {
    try {
      return this.prisma.resource.findMany();
    } catch (err) {
      throw new BadRequestException("Can't fetch resource!", err.message);
    }
  }

  findOne(id: number) {
    return this.prisma.resource.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateResourceDto, file, user) {
    if (file) {
      const uploadedFileUrl = await this.awsService.upload(file);
      updateResourceDto['url'] = uploadedFileUrl;
    }
    return this.prisma.resource.update({
      where: { id },
      data: updateResourceDto,
    });
  }

  remove(id: number) {
    return this.prisma.resource.delete({
      where: { id },
    });
  }
}
