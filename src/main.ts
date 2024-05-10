import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Env } from "./env";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Desafio MKS')
  .setDescription("Swagger desafio MKS")
  .setVersion('1.0')
  .addTag("#MKS")
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT')

  await app.listen(port);
}

bootstrap();