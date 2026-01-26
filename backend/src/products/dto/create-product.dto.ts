import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';
import { BedModels, Size } from '@prisma/client'; // Importa os Enums gerados pelo Prisma

export class CreateProductDto {
    @IsEnum(BedModels)
    @IsNotEmpty()
    model: BedModels;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsEnum(Size)
    @IsNotEmpty()
    size: Size;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsString()
    @IsOptional()
    mainImage?: string;
}
