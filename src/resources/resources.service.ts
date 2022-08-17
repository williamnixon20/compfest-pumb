import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class ResourcesService {
  constructor(
    private readonly prisma: PrismaService,
    private awsService: AwsService,
  ) {}

  async create(createResourceDto, file, user) {
    const uploadedFileUrl = await this.awsService.upload(file);
    createResourceDto['url'] = uploadedFileUrl;
    const { lecture_id, ...createResourceData } = createResourceDto;
    console.log(createResourceData);
    return await this.prisma.resource.create({
      data: {
        url: uploadedFileUrl,
        type: createResourceData.type,
        lecture: {
          connect: { id: +lecture_id },
        },
      },
    });
  }

  findAll() {
    return this.prisma.resource.findMany();
  }

  findOne(id: number) {
    return this.prisma.resource.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateResourceDto, file, user) {
    const uploadedFileUrl = await this.awsService.upload(file);
    updateResourceDto['url'] = uploadedFileUrl;
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
