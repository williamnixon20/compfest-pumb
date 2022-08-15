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
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FullOption } from './entities/full-option.entity';

@Controller('options')
@ApiTags('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: FullOption })
  create(
    @Body() createOptionDto: CreateOptionDto,
  ) {
    return this.optionsService.create(createOptionDto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: FullOption, isArray: true })
  findAll() {
    return this.optionsService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: FullOption })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.optionsService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: FullOption })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOptionDto: UpdateOptionDto,
  ) {
    return this.optionsService.update(id, updateOptionDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: FullOption })
  remove(@Param('id', ParseIntPipe) id: number,
  ) {
    return this.optionsService.remove(id);
  }
}
