import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateJobDto {

    @IsOptional()
    RDx_nombre: string
    
    @IsOptional()
    RDx_descripcion: string

    @IsOptional()
    SDx_destacado: string;

    @IsOptional()
    SDx_keywords: string;
    
    @IsOptional()
    SDx_expAnios: number

    @IsOptional()
    SDx_edadMin: number

    @IsOptional()
    SDx_edadMax: number

    @IsOptional()
    SDx_estudios: string

    @IsOptional()
    SDx_idioma: string

    @IsOptional()
    SDx_nivel: number

    @IsOptional()
    SDx_conocimiento: string

    @IsOptional()
    SDx_dispViaje: boolean

    @IsOptional()
    SDx_cambioDomicilio: boolean

    @IsOptional()
    SDx_discapacidad: boolean

    @IsOptional()
    SDx_ciudad: string

    @IsOptional()
    SDx_pais: number

    @IsOptional()
    SDx_estado: number

    @IsOptional()
    RDx_categoria: number

    @IsOptional()
    RDx_subCategoria: number

    @IsOptional()
    RDx_tipo: number

    @IsOptional()
    RDx_usuario: number

    
    @IsOptional()
    SDx_beneficios: string

    @IsOptional()
    SDx_contrato: string

    @IsOptional()
    SDx_horario: string
    @IsOptional()
    SDx_fechacontrato: string
    @IsOptional()
    SDx_fechalimite: string
    @IsOptional()
    SDx_vacantes: number
    @IsOptional()
    SDx_modoid: number
    @IsOptional()
    SDx_nomina: number

    @IsOptional()
    SDx_urgente: boolean

    @IsOptional()
    SDx_contratacionInmediato: number

    
    @IsOptional()
    SDx_direccion: string

    @IsOptional()
    SDx_sueldo: string

    
    @IsOptional()
    SDx_idedita: number // EL ID SI ES EDITAR

    @IsOptional()
    SDx_municipio:number

}
    // publish_work 

    // 'RDx_nombre',                           // titulo del empleo varchar
    // 'RDx_descripcion',                      // descripcion del empleo varchar
    // 'SDx_destacado',                        // esta opcion todavía no hay que ponerla en la vista int
    // 'SDx_keywords',                         // palabras claves del empleo varchar
    // 'SDx_expAnios',                         // requisito, si se necesitan años de experiencia int
    // 'SDx_edadMin',                          // requisito, edad minima int
    // 'SDx_edadMax',                          // requisito, si necesita edad maxima int
    // 'SDx_estudios',                         // grado de extudio del empleo varchar
    // 'SDx_idioma',
    // 'SDx_nivel',
    // 'SDx_conocimiento',
    // 'SDx_dispViaje',                        // disponibilidad de viaje int 1 o 0
    // 'SDx_cambioDomicilio',                  // si el trabajo pide cambio de domicilio int 1 o 0
    // 'SDx_discapacidad',                     // si el empleo permite discapacidad int 1 o 0
    // 'SDx_ciudad',                           // ciudad de la ubicacion del empleo
    // 'SDx_pais',                             // pais de la ubicacion del empleo
    // 'SDx_estado',                           // estado de la ubicación del empleo
    // 'RDx_categoria',                        // categoría 3 por default
    // 'RDx_subCategoria',                     // el area en donde pertenece el empleo, area de tecnologia u otra
    // 'RDx_tipo',                             // el empleo en sí, por ahora manda cualquier parametro para probar
    // 'RDx_usuario',                          // id del usuario que está publicando
    // 'SDx_beneficios',                       // si hay algun beneficio al trabajar ahí varchar
    // 'SDx_contrato',                         // especificaciones del contrato, como cuanto ganaría al año varchar
    // 'SDx_horario',                          // horario del trabajo, de entrada varchar
    // 'SDx_fechacontrato',                    // fecha en la que inicia el contrato datetime
    // 'SDx_fechalimite',                      // fecha en la que expira el contrato
    // 'SDx_vacantes',                         // si hay numero de vacantes para ese puesto
    // 'SDx_modoid',                           // es si será remoto, presencial o hibrido
    // 'SDx_nomina',                           // es el modo de pago, si es quincenal, semanal, mensual o al año
    // 'SDx_urgente',                          // urgente es que si urge demasiado el empleo int 1 o 0
    // 'SDx_contratacionInmediato',            // si la contratacion es inmediata, mas no puede ser urgente int 1 o 0
    // 'SDx_direccion',                        // ubicacion de las oficinas
    // 'SDx_sueldo',                           // cuanto ganará, y esto dependerá con la nomina si será catorcenal, mensual etc
    // 'SDx_idedita'