import { Body, Controller, Post, UsePipes } from "@nestjs/common";

import apiReg001 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
// import apiReg002 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg002";
// import apiReg003 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg003";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import { RegistrationService } from "../service/registration.service";

import type {
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";

@Controller()
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @Post("/registration")
  @UsePipes(new ZodPipe(apiReg001))
  async postRegistration(
    @Body() body: ApiReg001RequestBody,
  ): Promise<ApiReg001ResponseCreated> {
    const response = await this.registrationService.postRegistration(body);
    return response;
  }
}