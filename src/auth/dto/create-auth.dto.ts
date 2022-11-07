import { IsString } from "class-validator";

export class CreateAuthDto {

    @IsString()
    token: string
}
