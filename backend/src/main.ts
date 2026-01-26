import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Habilita CORS para permitir que o frontend acesse
    app.enableCors();

    app.setGlobalPrefix('api');

    await app.listen(process.env.PORT ?? 3000);
    console.log('Api rodando em http://localhost:3000');
}
bootstrap();
