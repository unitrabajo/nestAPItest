import { IsString } from "class-validator";

export class GoogleSinginDto {

    @IsString()
    googleToken: string;

}