import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  
  // Global error handler for better error messages
  app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(err.status || 500).json({
      statusCode: err.status || 500,
      message: err.message || 'Internal server error',
      error: err.name || 'Error',
    });
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
