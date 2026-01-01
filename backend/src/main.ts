import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source'; // Import AppDataSource

async function bootstrap() {
  // Initialize TypeORM
  await AppDataSource.initialize()
    .then(() => console.log('Data Source has been initialized!'))
    .catch((err) => console.error('Error during Data Source initialization', err));

  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
