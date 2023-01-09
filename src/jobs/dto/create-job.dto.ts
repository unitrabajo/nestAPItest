import { IsString } from "class-validator";

export class CreateJobDto {

    @IsString()
    RDx_nombre: string



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