import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar o CORS
  app.enableCors({
    origin: '*', // Permite todas as origens, substitua por um URL específico se necessário
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization', // Cabeçalhos permitidos
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
