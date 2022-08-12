import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Resource } from './entities/resource.entity';

@Controller('resources')
@ApiTags('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: Resource })
  create(
    @Body() createResourceDto: CreateResourceDto,
  ) {
    return this.resourcesService.create(createResourceDto);
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
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.resourcesService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: Resource })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: Resource })
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.resourcesService.remove(id);
  }
}
