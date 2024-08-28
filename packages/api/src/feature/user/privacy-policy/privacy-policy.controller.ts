import { Controller, Post, UsePipes } from "@nestjs/common";

import apiUsr004 from "@sparcs-clubs/interface/api/user/endpoint/apiUsr004";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import { GetUser } from "@sparcs-clubs/api/common/util/decorators/param-decorator";
import logger from "@sparcs-clubs/api/common/util/logger";

import PrivacyPolicyService from "./privacy-policy.service";

import type { ApiUsr004ResponseCreated } from "@sparcs-clubs/interface/api/user/endpoint/apiUsr004";

@Controller()
export default class PrivacyPolicyController {
  constructor(private readonly privacyPolicyService: PrivacyPolicyService) {}

  @Post("/user/privacy-policy/agree")
  @UsePipes(new ZodPipe(apiUsr004))
  async postUserPrivacyPolicyAgree(
    @GetUser() user: GetUser,
  ): Promise<ApiUsr004ResponseCreated> {
    logger.debug(`[postUserPrivacyPolicyAgree] checking userId ${user.id}`);

    const result = await this.privacyPolicyService.postUserPrivacyPolicyAgree({
      userId: user.id,
    });

    return result;
  }
}
