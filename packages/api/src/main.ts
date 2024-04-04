import { NestFactory } from "@nestjs/core";
import { env } from "@sparcs-clubs/api/env";
import {
  UnexpectedExceptionFilter,
  HttpExceptionFilter,
  ZodErrorFilter,
} from "@sparcs-clubs/api/exceptions/exception.filter";
import { ZodError } from "zod";
import { HttpException } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new UnexpectedExceptionFilter(),
    new ZodErrorFilter<ZodError>(),
    new HttpExceptionFilter<HttpException>(),
  ); // 만약 global추가하는 경우 AllExceptionFilter 뒤에 추가하면 됨.
  await app.listen(env.SERVER_PORT);
}
bootstrap();
