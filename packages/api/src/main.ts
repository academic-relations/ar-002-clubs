import { HttpException } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { ZodError } from "zod";

import { env } from "@sparcs-clubs/api/env";

import { AppModule } from "./app.module";
import {
  HttpExceptionFilter,
  UnexpectedExceptionFilter,
  ZodErrorFilter,
} from "./common/util/exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new UnexpectedExceptionFilter(),
    new ZodErrorFilter<ZodError>(),
    new HttpExceptionFilter<HttpException>(),
  ); // 만약 global추가하는 경우 AllExceptionFilter 뒤에 추가하면 됨.
  app.use(cookieParser());
  // localhost에서의 cors 해결
  if (process.env.NODE_ENV === "development") {
    app.enableCors({
      origin: `http://localhost:${process.env.CLIENT_PORT}`,
      credentials: true,
    });
  }
  await app.listen(env.SERVER_PORT);
}
bootstrap();
