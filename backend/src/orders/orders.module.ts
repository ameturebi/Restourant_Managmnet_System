import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { JwtModule } from '@nestjs/jwt'; // Added JwtModule for JWT support
import { AuthModule } from '../auth/auth.module'; // Import AuthModule for JwtService access
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Ensure guards are registered if used
import { RolesGuard } from '../auth/roles.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '1h' },
        }),
        AuthModule, // Ensure AuthModule is imported
    ],
    providers: [OrdersService, JwtAuthGuard, RolesGuard], // Guards added for DI
    controllers: [OrdersController],
})
export class OrdersModule {}