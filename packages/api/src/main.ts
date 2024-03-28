import { NestFactory } from "@nestjs/core";
import { env } from "@sparcs-clubs/api/env";
import { AppModule } from "./app.module";
import { AllExceptionFilter } from "./exceptions/exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(env.SERVER_PORT);
}
bootstrap();
