import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [ProductsModule, PrismaModule, UsersModule, AuthModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
    exports: [PrismaService],
})
export class AppModule {}
