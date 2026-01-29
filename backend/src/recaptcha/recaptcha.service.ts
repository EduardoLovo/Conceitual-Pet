import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RecaptchaService {
    private readonly logger = new Logger(RecaptchaService.name);

    constructor(private readonly httpService: HttpService) {}

    async validateToken(token: string): Promise<boolean> {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

        try {
            const { data } = await lastValueFrom(
                this.httpService.post(verifyUrl),
            );

            this.logger.debug(`Recaptcha Score: ${data.score}`); // Útil para debugar no terminal

            // Verifica sucesso E se a pontuação é aceitável (0.5 é o padrão)
            if (!data.success || data.score < 0.5) {
                throw new HttpException(
                    'Ação suspeita detectada (Recaptcha)',
                    HttpStatus.FORBIDDEN,
                );
            }

            return true;
        } catch (error) {
            // Se já for HttpException, repassa. Se não, erro genérico.
            if (error instanceof HttpException) throw error;
            throw new HttpException(
                'Erro ao conectar com Google Recaptcha',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
