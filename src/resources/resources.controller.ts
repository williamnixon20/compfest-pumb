import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Resource } from './entities/resource.entity';
import { Express } from 'express';
@Controller('resources')
@ApiTags('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: Resource })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Request() req,
    @Body() createResourceDto: CreateResourceDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.resourcesService.create(req.user, createResourceDto, file);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: Resource, isArray: true })
  findAll() {
    return this.resourcesService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: Resource })
  findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiCreatedResponse({ type: Resource })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Body() createResourceDto: UpdateResourceDto,
    @UploadedFile()
    file: Express.Multer.File,
    @Request() req,
    @Param('id') id: string,
  ) {
    return this.resourcesService.update(req.user, id, createResourceDto, file);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: Resource })
  remove(
    @Request() req,
    @Param('id') id: string,
  ) {
    return this.resourcesService.remove(req.user, id);
  }
}
