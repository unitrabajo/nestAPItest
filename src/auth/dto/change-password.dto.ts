import { IsString, IsUUID } from "class-validator";

export class ChangePasswordDto {

    @IsUUID()
    token: string;

    @IsString()
    newPassword: string;

}