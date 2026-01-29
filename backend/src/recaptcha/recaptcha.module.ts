import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RecaptchaService } from './recaptcha.service';

@Module({
    imports: [HttpModule], // Importa o Axios para funcionar aqui dentro
    providers: [RecaptchaService], // Declara que este módulo tem o Service
    exports: [RecaptchaService], // <--- O PULO DO GATO: Exporta para outros usarem
})
export class RecaptchaModule {}
