import { IsString } from "class-validator"

export class CreatePaypalDto {

    @IsString()
    transactionId: string // Id que genera paypal del lado del front

    @IsString()
    orderId: string // Id del "paquete/orden" de nuestra base de datos

}
