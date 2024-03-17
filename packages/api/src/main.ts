import { NestFactory } from "@nestjs/core";
import { env } from "@sparcs-clubs/api/env";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.SERVER_PORT);
}
bootstrap();
