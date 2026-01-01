import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeORM for database management
import { JwtModule } from '@nestjs/jwt'; // Import JWT for authentication
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module'; // Import Orders Module
import { Order } from './orders/order.entity'; // Import Order Entity
import { AuthModule } from './auth/auth.module'; // Import Auth Module
import { User } from './auth/user.entity'; // Import User Entity

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // MySQL database setup for XAMPP
      host: 'localhost',
      port: 3306,
      username: 'root', // Default XAMPP username
      password: '', // Default XAMPP password (empty)
      database: 'ourorder', // Database name
      entities: [Order, User], // ✅ Added User entity here to create the table automatically
      synchronize: true, // ⚠️ Auto-creates tables based on entity definition (for development only)
    }),
    TypeOrmModule.forFeature([Order, User]), // ✅ Added User entity to be used in services
    OrdersModule, // Orders module handles order logic
    AuthModule, // Auth module for handling user login and authentication
    JwtModule.register({
      secret: 'your_secret_key', // Replace with a strong secret key
      signOptions: { expiresIn: '60m' }, // Increased token expiration to 60 minutes
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}