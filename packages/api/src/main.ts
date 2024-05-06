import { NestFactory } from "@nestjs/core";
import { env } from "@sparcs-clubs/api/env";
import cookieParser from "cookie-parser";
import session from "express-session";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(
    session({
      secret: env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 86400000 }, // 24 hours
    }),
  );
  app.use(cookieParser());

  await app.listen(env.SERVER_PORT);
}
bootstrap();
