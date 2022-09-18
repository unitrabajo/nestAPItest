import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { DataSource } from 'typeorm';
import { CreatePaypalDto } from './dto/create-paypal.dto';
import { PaypalOrderStatusResponse } from './interfaces/paypal.interface';

@Injectable()
export class PaypalService {


  constructor( private readonly httpService: HttpService,
               private readonly configService: ConfigService,
               private readonly dataSource: DataSource ) {}




  async payOrder( createPaypalDto: CreatePaypalDto ) {

    // Validar sesión del usuario

    // Podemos validar que la orden corresponda al usuario 

    const access_token = await firstValueFrom(this.generateAccessToken());

    const { transactionId } = createPaypalDto;

    const { data } = await firstValueFrom(this.httpService.get<PaypalOrderStatusResponse>(`https://api.sandbox.paypal.com/v2/checkout/orders/${ transactionId }`, {
      headers: {
        'Authorization': `Bearer ${ access_token }`
      }
    })).catch( _ => {
      throw new UnauthorizedException(`Orden no reconocida`);
    })

    
    // Validar que la orden exista en la base de datos
    // Validar que el monto pagado sea igual al monto total de la orden

    // Asignar la orden como pagada (se recomienda almacenar la transactionId ya que sirve para evaluar en paypal a futuro)

    return data;
  }
  
  
  generateAccessToken() {


    const base64Token = Buffer.from(`${ this.configService.get('PAYPAL_CLIENT') }:${ this.configService.get('PAYPAL_SECRET') }`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');


    return this.httpService.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', body, {
      headers: {
        'Authorization': `Basic ${ base64Token }`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).pipe(
      map(response => response.data.access_token)
    );

  }


}
