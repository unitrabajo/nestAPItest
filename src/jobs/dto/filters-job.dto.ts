import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../common/dto/pagination.dto";



export class FiltersJobDto extends PartialType(PaginationDto) {

    @IsOptional()
    area: number; // id de que area pertenece el empleo buscado

    @IsOptional()
    empleo: number; // id del empleo en especifico

    @IsOptional()
    nomina: number; // busqueda por nomina semanal. quincenal, mensual etc...

    @IsOptional()
    sueldo: string;   // por sueldo cuando pagan 

    @IsOptional()
    idioma: number;   // por id de idioma

    @IsOptional()
    keyword: string;  // por texto que ponga el usuario

    @IsOptional()
    modo: number;     // si es precensial, remoto o hibrido

    @IsOptional()
    folio: number;    // mandar nulo para busquedas

    @IsString()
    tipo: number;     // mandar el parametro 2
    // sq: number;       // si quieres imprimir el query que se arma, pon 1

}
