import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { ClubModule } from "../club/club.module";

import { FileModule } from "../file/file.module";

import { StorageController } from "./controller/storage.controller";
import { StorageRepository } from "./repository/storage.repository";
import { StorageService } from "./service/storage.service";

@Module({
  imports: [ClubModule, DrizzleModule, FileModule],
  controllers: [StorageController],
  providers: [StorageRepository, StorageService],
  exports: [],
})
export default class StorageModule {}
