import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto) {
        // Verifica se a confirmação de senha confere (usando 'as any' para acessar campos que podem não estar no DTO ainda)
        if ((data as any).password !== (data as any).passwordConfirm) {
            throw new BadRequestException('A confirmação de senha não confere.');
        }

        // 1. Verifica se o e-mail já existe
        const userExists = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (userExists) {
            throw new ConflictException('Este e-mail já está cadastrado.');
        }

        // 2. Criptografa a senha (Hash)
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // 3. Salva no banco (removendo a senha do retorno e o campo de confirmação)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordConfirm, ...userData } = data as any;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = await this.prisma.user.create({
            data: {
                ...userData, // Inclui 'phone' e outros dados, mas sem 'passwordConfirm'
                password: hashedPassword,
            },
        });

        return user;
    }

    async findAll() {
        // Retorna todos os usuários mas SELECIONA apenas campos seguros (sem senha)
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true, // Importante para checar permissão depois
            },
        });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        // Se for atualizar senha, precisaria criptografar novamente (simplificado aqui)
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    async remove(id: number) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}
