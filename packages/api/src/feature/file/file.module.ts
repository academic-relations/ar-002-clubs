import { S3Client } from "@aws-sdk/client-s3";
import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { FileController } from "./controller/file.controller";
import { FileRepository } from "./repository/file.repository";
import { FileService } from "./service/file.service";

@Module({
  imports: [DrizzleModule],
  controllers: [FileController],
  providers: [
    FileService,
    FileRepository,
    {
      provide: S3Client,
      useFactory: () =>
        new S3Client({
          region: process.env.S3_REGION,
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
          },
        }),
    },
  ],
})
export class FileModule {}
