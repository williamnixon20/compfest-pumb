import { Controller, Get, Body, Patch, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { UpdateStatusDto } from './dto/admin.dto';

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
  @Patch('/courses')
  updateCourse(@Body() updateCourseDto: UpdateStatusDto, @Request() req) {
    return this.adminService.updateCourse(
      updateCourseDto.updateArray,
      req.user,
    );
  }

  @ApiBearerAuth()
  @Patch('/teachers')
  updateTeacher(@Body() updateTeacherDto: UpdateStatusDto, @Request() req) {
    return this.adminService.updateTeacher(
      updateTeacherDto.updateArray,
      req.user,
    );
  }
}
