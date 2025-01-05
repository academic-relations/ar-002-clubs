import { Module } from "@nestjs/common";

import UserModule from "@sparcs-clubs/api/feature/user/user.module";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { EntityRepository } from "../entity.repository";

import ContentController from "./content.controller";
import { ContentService } from "./content.service";

@Module({
  imports: [DrizzleModule, UserModule],
  controllers: [ContentController],
  providers: [ContentService, EntityRepository],
})
export class ContentModule {}
