import { Module } from "@nestjs/common";

import UserModule from "@sparcs-clubs/api/feature/user/user.module";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { EntityRepository } from "../entity.repository";

import VoteController from "./vote.controller";
import { VoteService } from "./vote.service";

@Module({
  imports: [DrizzleModule, UserModule],
  controllers: [VoteController],
  providers: [VoteService, EntityRepository],
})
export class VoteModule {}
