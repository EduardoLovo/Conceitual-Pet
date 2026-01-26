import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    // Criar Cama
    async create(data: CreateProductDto) {
        return this.prisma.product.create({
            data: {
                ...data,
                // O Prisma espera Decimal, mas o JS manda number. O Prisma converte automático,
                // mas é bom garantir que imagens venham vazias se não informadas.
                images: {
                    create: [], // Inicializa sem imagens extras por enquanto
                },
            },
        });
    }

    // Listar Todas
    async findAll() {
        return this.prisma.product.findMany({
            include: { images: true }, // Traz as imagens extras junto
        });
    }

    // Buscar por ID
    async findOne(id: number) {
        return this.prisma.product.findUnique({
            where: { id },
            include: { images: true },
        });
    }

    // Deletar
    async remove(id: number) {
        return this.prisma.product.delete({
            where: { id },
        });
    }
}
