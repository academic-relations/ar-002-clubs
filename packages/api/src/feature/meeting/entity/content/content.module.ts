import { Module } from "@nestjs/common";

import UserModule from "@sparcs-clubs/api/feature/user/user.module";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import ContentController from "./content.controller";
import { ContentRepository } from "./content.repository";
import { ContentService } from "./content.service";

@Module({
  imports: [DrizzleModule, UserModule],
  controllers: [ContentController],
  providers: [ContentService, ContentRepository],
})
export class ContentModule {}
