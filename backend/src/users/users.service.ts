import {
    Injectable,
    ConflictException,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client'; // Importante para tipar o erro
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto) {
        // 1. Verifica confirmação de senha
        if ((data as any).password !== (data as any).passwordConfirm) {
            throw new BadRequestException(
                'A confirmação de senha não confere.',
            );
        }

        // 2. Criptografa a senha
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // 3. Prepara os dados (remove passwordConfirm)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordConfirm, ...userData } = data as any;

        try {
            // 4. Tenta Salvar no Banco
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...user } = await this.prisma.user.create({
                data: {
                    ...userData,
                    password: hashedPassword,
                },
            });

            return user;
        } catch (error) {
            // 5. Captura erros de duplicidade (Email ou Telefone)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Código P2002: Violação de restrição única (Unique constraint failed)
                if (error.code === 'P2002') {
                    const target = error.meta?.target as string[];

                    if (target.includes('email')) {
                        throw new ConflictException(
                            'Este e-mail já está cadastrado.',
                        );
                    }

                    if (target.includes('phone')) {
                        throw new ConflictException(
                            'Já existe um usuário cadastrado com este telefone.',
                        );
                    }
                }
            }

            // Se for outro erro, lança um erro genérico
            throw new InternalServerErrorException('Erro ao criar usuário.');
        }
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
