import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobMode, JobRequirement, JobPaymode } from './entities';
import { Job } from './entities/job.entity';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
  imports: [
    TypeOrmModule.forFeature([ 
      JobMode, 
      JobPaymode,
      JobRequirement,
      Job
    ]),
  ],
  exports: [
    TypeOrmModule
  ]
})
export class JobsModule {}
