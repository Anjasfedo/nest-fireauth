import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
// import { FirebaseAuthMiddleware } from '@src/middlewares/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(new FirebaseAuthMiddleware().use);
  await app.listen(3000);
}

bootstrap();
