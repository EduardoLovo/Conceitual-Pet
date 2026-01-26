import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';
import { Role } from '@prisma/client'; // Importa o Enum direto do Prisma

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail({}, { message: 'O e-mail informado é inválido' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    password: string;

    @IsEnum(Role, { message: 'O cargo deve ser DEV, ADMIN, SELLER ou USER' })
    @IsNotEmpty()
    role: Role;
}
