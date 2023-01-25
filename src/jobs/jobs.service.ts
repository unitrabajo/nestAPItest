import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
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

  async create(createJobDto: CreateJobDto) {

    const {
      RDx_nombre,
      RDx_descripcion = null,
      SDx_destacado,
      SDx_keywords = null,
      SDx_expAnios,
      SDx_edadMin,
      SDx_edadMax,
      SDx_estudios = null,
      SDx_idioma = null,
      SDx_nivel = null,
      SDx_conocimiento = null,
      SDx_dispViaje = null,
      SDx_cambioDomicilio,
      SDx_discapacidad,
      SDx_ciudad = null,
      SDx_pais,
      SDx_estado,
      RDx_categoria,
      RDx_subCategoria,
      RDx_tipo,
      RDx_usuario,
      SDx_beneficios = null,
      SDx_contrato = null,
      SDx_horario = null,
      SDx_fechacontrato,
      SDx_fechalimite,
      SDx_vacantes,
      SDx_modoid,
      SDx_nomina,
      SDx_urgente,
      SDx_contratacionInmediato,
      SDx_direccion = null,
      SDx_sueldo,
      SDx_idedita = null
    } = createJobDto;


    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();

  
    let result = await queryRunner.manager.query(
      `call publish_work(
        ${RDx_nombre ? "'" + RDx_nombre +"'" : null},
        ${RDx_descripcion ? "'" + RDx_descripcion +"'" : null},
        ${SDx_destacado ?? 0},
        ${SDx_keywords ? "'" + SDx_keywords +"'" : null},
        ${SDx_expAnios ? "'" + SDx_expAnios +"'" : null},
        ${SDx_edadMin  ? "'" + SDx_edadMin +"'" : null},
        ${SDx_edadMax  ? "'" + SDx_edadMax +"'" : null},
        ${SDx_estudios ? "'" + SDx_estudios +"'" : null},
        ${SDx_idioma ? "'" + SDx_idioma +"'" : null},
        ${SDx_nivel ? "'" + SDx_nivel +"'" : null},
        ${SDx_conocimiento ? "'" + SDx_conocimiento +"'" : null},
        ${SDx_dispViaje ? 1 : 0},
        ${SDx_cambioDomicilio ? 1 : 0},
        ${SDx_discapacidad ? 1 : 0},
        ${SDx_ciudad ? "'" + SDx_ciudad +"'" : null},
        ${SDx_pais ? "'" + SDx_pais +"'" : null},
        ${SDx_estado ? "'" + SDx_estado +"'"  : null},
        ${RDx_categoria ? "'" + RDx_categoria +"'" : null},
        ${RDx_subCategoria ? "'" + RDx_subCategoria +"'" : null},
        ${RDx_tipo ? "'" + RDx_tipo +"'" : null},
        ${RDx_usuario ? "'" + RDx_usuario +"'" : null},
        ${SDx_beneficios ? "'" + SDx_beneficios +"'" : null},
        ${SDx_contrato ? "'" + SDx_contrato +"'" : null},
        ${SDx_horario ? "'" + SDx_horario +"'" : null},
        ${SDx_fechacontrato ? "'" + SDx_fechacontrato +"'" : null},
        ${SDx_fechalimite ? "'" + SDx_fechalimite +"'" : null},
        ${SDx_vacantes ? "'" + SDx_vacantes +"'" : null},
        ${SDx_modoid ? "'" + SDx_modoid +"'" : null},
        ${SDx_nomina ? "'" + SDx_nomina +"'" : null},
        ${SDx_urgente ? 1 : 0},
        ${SDx_contratacionInmediato ? 1 : 0 },
        ${SDx_direccion ? "'" + SDx_direccion +"'" : null},
        ${SDx_sueldo ? "'" + SDx_sueldo.replace(',', '') +"'" : null},
        ${SDx_idedita ? "'" + SDx_idedita +"'" : null})`,
    );

    

    await queryRunner.release();
        

    return {
      status: result[0][0].valido == 1
    };

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

  async findAllByUserId( userId: string ) {

    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    
    const result = await queryRunner.manager.query(
      `call search_work(null, null, null, null, null, null, null, ${userId}, 2, null)`
    );

    // if ( !result[0][0] ) {
    //   return new NotFoundException({
    //     message: `No existe un empleo con el ID ${id}`
    //   })
    // }

    await queryRunner.release();

    return result[0];

  }


  async findByFolioToEdit( id: string ) {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    
    const result = await queryRunner.manager.query(
      `call search_work(null, null, null, null, null, null, null, ${id}, 3, null)`
    );

    if ( !result[0][0] ) {
      return new NotFoundException({
        message: `No existe un empleo con el ID ${id}`
      })
    }

    await queryRunner.release();

    return result[0][0];
  }


  async findAllFilters(filtersJobDto: FiltersJobDto) {

    const {
      area = null,
      empleo = null,
      nomina = null,
      sueldo = null,
      idioma = null,
      keyword = null,
      modo = null,
      folio = null,
      tipo = null,
    } = filtersJobDto;


    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    
    var result = await queryRunner.manager.query(
      `call search_work( ${area}, ${empleo}, ${nomina}, ${sueldo}, ${idioma}, ${keyword}, ${modo}, ${folio}, ${tipo}, 0 );`
    );

    await queryRunner.release();

    return result;

  }




  async findOne(id: number) {
    console.log(id)
    try {
      // let job = await this.jobRepository.findOne({ where: { productid: id}});

      // if ( !job ) {
      //   return {
      //     status: false,
      //     message: `No existe un empleos con el ID "${id}"`
      //   }
      // }

      const queryRunner = this.dataSource.createQueryRunner();
    
      await queryRunner.connect();
      
      var result = await queryRunner.manager.query(
        `call search_work(null, null, null, null, null, null, null, ${id}, 3, null)`
      );
  
      await queryRunner.release();

      if ( !result[0][0]){
        return {
          status: false,
          message: `No existe un empleos con el ID "${id}"`
        }
      }
  

      return {
        status: true,
        job: result[0][0]
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
