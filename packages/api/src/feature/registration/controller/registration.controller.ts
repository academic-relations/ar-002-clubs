import { Controller, Get } from "@nestjs/common";

import { ApiReg004ResponseOK } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";

import { Public } from "@sparcs-clubs/api/common/util/decorators/method-decorator";

import { RegistrationService } from "../service/registration.service";

@Controller()
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @Public()
  @Get("student/registrations/events")
  async getStudentRegistrationEvents(): Promise<ApiReg004ResponseOK> {
    const result =
      await this.registrationService.getStudentRegistrationEvents();
    return result;
  }
}
