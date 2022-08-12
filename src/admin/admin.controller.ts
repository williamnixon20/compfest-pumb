import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @ApiBearerAuth()
  @Get('/teachers')
  findPendingTeacher(@Request() req) {
    return this.adminService.findAllPendingTeacher(req.user);
  }
  @ApiBearerAuth()
  @Get('/courses')
  findPendingCourse(@Request() req) {
    return this.adminService.findAllPendingCourse(req.user);
  }
  @ApiBearerAuth()
  @Patch('/courses/:id')
  updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto,
    @Request() req,
  ) {
    return this.adminService.updateCourse(+id, updateCourseDto, req.user);
  }

  @ApiBearerAuth()
  @Patch('/teachers/:id')
  updateTeacher(
    @Param('id') id: string,
    @Body() updateTeacherDto,
    @Request() req,
  ) {
    return this.adminService.updateTeacher(+id, updateTeacherDto, req.user);
  }
}
