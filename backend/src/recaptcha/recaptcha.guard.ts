import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { RecaptchaService } from './recaptcha.service';

@Injectable()
export class RecaptchaGuard implements CanActivate {
    constructor(private readonly recaptchaService: RecaptchaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // 1. Pega o objeto da requisição HTTP
        const request = context.switchToHttp().getRequest();

        // 2. Busca o token no cabeçalho (header) específico
        const token = request.headers['recaptcha-token'];

        // 3. Se não tiver token, barra imediatamente
        if (!token) {
            throw new ForbiddenException('Token do Recaptcha não fornecido');
        }

        // 4. Se tiver token, chama o serviço para validar no Google
        // O serviço vai retornar true ou lançar um erro se o score for baixo
        return await this.recaptchaService.validateToken(token);
    }
}
