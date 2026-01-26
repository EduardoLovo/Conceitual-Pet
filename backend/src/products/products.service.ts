import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

    async findFeatured() {
        return this.prisma.product.findMany({
            where: {
                isFeatured: true, // Filtra onde é verdadeiro
            },
            include: {
                images: true,
            },
            // Opcional: Pegar só os últimos 4 ou 8
            take: 8,
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
