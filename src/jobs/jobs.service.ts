import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { FiltersJobDto } from './dto/filters-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobRequirement, JobMode, JobPaymode } from './entities';
import { Job } from './entities/job.entity';

@Injectable()
export class JobsService {

  private readonly logger = new Logger('JobsService');


  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobMode)
    private readonly jobModeRepository: Repository<JobMode>,
    @InjectRepository(JobPaymode)
    private readonly jobPaymodeRepository: Repository<JobPaymode>,
    @InjectRepository(JobRequirement)
    private readonly jobRequirementRepository: Repository<JobRequirement>,
    private readonly dataSource: DataSource,
  ){}

  create(createJobDto: CreateJobDto) {

    

    return 'This action adds a new job';
  }



  async findAll() {

    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

    let result = await queryRunner.manager.query(
      "SELECT * FROM w_works"
    );

    await queryRunner.release();

    return result;

  }



  async findAllFilters(filtersJobDto: FiltersJobDto) {

    const {
      area,
      empleo,
      nomina,
      sueldo,
      idioma,
      keyword,
      modo,
      folio,
      tipo,
    } = filtersJobDto;


    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    
    console.log(`call search_work( ${area ?? 0}, ${empleo ?? 0}, ${nomina ?? 0}, ${sueldo ?? 0}, ${idioma ?? 0}, ${keyword ?? 0}, ${modo ?? 0}, ${folio ?? 0}, ${tipo ?? 0}, 0 );`)
    
    var result = await queryRunner.manager.query(
      `call search_work( ${area ?? null}, ${empleo ?? null}, ${nomina ?? null}, ${sueldo ?? null}, ${idioma ?? null}, ${keyword ?? null}, ${modo ?? null}, ${folio ?? null}, ${tipo ?? null}, 0 );`
    );

    await queryRunner.release();

    return result;

  }




  async findOne(id: number) {

    try {
      let job = await this.jobRepository.findOneBy({ workid: id });

      if ( !job ) {
        return {
          status: false,
          message: `No existe un empleos con el ID "${id}"`
        }
      }

      return {
        status: true,
        job
      }

    } catch (error) {
      this.handleDBExceptions(error)
    }

    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }


  async getAllJobMode() {
    return await this.jobModeRepository.find();
  }

  async getAllJobPaymode() {
    return await this.jobPaymodeRepository.find();
  }

  async getAllJobRequirement() {
    return this.jobRequirementRepository.find();
  }


  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }


}
