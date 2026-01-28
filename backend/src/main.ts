import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Habilita CORS para permitir que o frontend acesse
    app.enableCors();

    app.setGlobalPrefix('api');

    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    Logger.log(`Aplicação rodando em: http://localhost:${port}/api`, 'Bootstrap');
}
bootstrap().catch((err) => {
    Logger.error(`Erro ao iniciar a aplicação: ${err.message}`, 'Bootstrap');
});
