import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Option } from './entities/option.entity';

@Controller('options')
@ApiTags('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: Option })
  create(
    @Request() req,
    @Body() createOptionDto: CreateOptionDto,
  ) {
    return this.optionsService.create(req.user, createOptionDto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: Option, isArray: true })
  findAll() {
    return this.optionsService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: Option })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.optionsService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: Option })
  update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOptionDto: UpdateOptionDto,
  ) {
    return this.optionsService.update(req.user, id, updateOptionDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: Option })
  remove(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.optionsService.remove(req.user, id);
  }
}
