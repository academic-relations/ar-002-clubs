import { Module } from "@nestjs/common";

import { ClubModule } from "../club/club.module";
import { FileModule } from "../file/file.module";

import { StorageController } from "./controller/storage.controller";
import { StorageRepository } from "./repository/storage.repository";

@Module({
  imports: [ClubModule, FileModule],
  controllers: [StorageController],
  providers: [StorageRepository],
  exports: [],
})
export default class StorageModule {}
