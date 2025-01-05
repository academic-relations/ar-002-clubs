import { Module } from "@nestjs/common";

import UserModule from "@sparcs-clubs/api/feature/user/user.module";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { ContentModule } from "./content/content.module";
import EntityController from "./entity.controller";
import { EntityRepository } from "./entity.repository";
import { EntityService } from "./entity.service";
import { VoteModule } from "./vote/vote.module";

@Module({
  imports: [DrizzleModule, UserModule, ContentModule, VoteModule],
  controllers: [EntityController],
  providers: [EntityService, EntityRepository],
})
export class EntityModule {}
