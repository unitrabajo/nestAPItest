




import { IsBoolean, IsNumber, IsString } from "class-validator"

export class CreateTransactionDto {

    @IsNumber()
    userId: number // ID el usuario

    @IsNumber()
    saleId: number // Id de la venta

    @IsString()
    transactionId: string // ID transacción de paypal

    @IsBoolean()
    isSuccess: boolean // si se completo el pago de paypal con éxito



}
