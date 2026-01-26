import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto'; // Vamos criar esse DTO agorinha
import { RegisterDto } from './dto/register.dto';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {
        return this.usersService.create({
            ...registerDto,
            role: Role.USER,
        });
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);

        if (!user) {
            throw new UnauthorizedException('Email ou senha incorretos');
        }

        // 2. Compara a senha enviada com o Hash do banco
        const isPasswordValid = await bcrypt.compare(
            loginDto.password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Email ou senha incorretos');
        }

        // 3. Gera o Token
        const payload = { sub: user.id, email: user.email, role: user.role };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
}
