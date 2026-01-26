import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail({}, { message: 'O e-mail informado é inválido' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    password: string;
}
