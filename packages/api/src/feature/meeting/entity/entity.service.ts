import {
  // HttpException, HttpStatus,
  Injectable,
} from "@nestjs/common";

// import { WsException } from "@nestjs/websockets";

import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import { EntityRepository } from "./entity.repository";

// import { EntityRepository } from "./entity.repository";

@Injectable()
export class EntityService {
  constructor(
    private readonly meetingRepository: EntityRepository,
    private readonly userPublicService: UserPublicService,
  ) {}
}
