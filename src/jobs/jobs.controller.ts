import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FiltersJobDto } from './dto/filters-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get('all')
  findAll() {
    return this.jobsService.findAll();
  }


  @Get('filters')
  findAllFilters( @Query() filtersJobDto: FiltersJobDto ) {
    return this.jobsService.findAllFilters(filtersJobDto);
  }


  @Get('mode/all')
  getAllJobMode() {
    return this.jobsService.getAllJobMode();
  }


  @Get('paymode/all')
  getAllJobPaymode() {
    return this.jobsService.getAllJobPaymode();
  }

  @Get('requirement/all')
  getAllJobRequirement() {
    return this.jobsService.getAllJobRequirement();
  }



  @Get('details/:id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
