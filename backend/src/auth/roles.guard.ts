import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        // Se não tiver usuário logado na requisição (Token inválido ou ausente)
        if (!user) {
            throw new UnauthorizedException('Usuário não autenticado');
        }

        // Verifica se o cargo do usuário bate com algum dos cargos permitidos
        const hasRole = requiredRoles.some((role) => user.role === role);

        if (!hasRole) {
            throw new ForbiddenException(
                'Acesso negado: Você não tem permissão para esta ação',
            );
        }

        return true;
    }
}
