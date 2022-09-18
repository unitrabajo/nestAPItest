

import { IsNumber, IsOptional } from "class-validator"

export class CreateSaleDto {

    @IsNumber()
    userId: number // ID el usuario

    @IsNumber()
    packageId: number // Id del paquete/producto/articulo 

    @IsNumber()
    amount: number // Cantidad

    @IsNumber()
    price: number // Precio

    @IsNumber()
    @IsOptional()
    saleId: number // Id de la venta

}
