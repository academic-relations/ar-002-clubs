import { Module } from "@nestjs/common";

import { DrizzleModule } from "@sparcs-clubs/api/drizzle/drizzle.module";
import UserModule from "@sparcs-clubs/api/feature/user/user.module";

import ClubPublicService from "../service/club.public.service";

import { ClubDelegateDRepository } from "./club.club-delegate-d.repository";

import ClubDelegateController from "./delegate.controller";
import ClubDelegateService from "./delegate.service";

@Module({
  imports: [DrizzleModule, UserModule],
  providers: [ClubDelegateService, ClubDelegateDRepository, ClubPublicService],
  controllers: [ClubDelegateController],
})
export class DelegateModule {}
