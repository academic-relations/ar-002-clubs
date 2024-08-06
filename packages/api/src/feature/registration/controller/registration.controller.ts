import { Body, Controller, Get, Post, UsePipes } from "@nestjs/common";

import apiReg001 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import apiReg002 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg002";
import apiReg003 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg003";

import { ApiReg004ResponseOK } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import {
  Public,
  Student,
} from "@sparcs-clubs/api/common/util/decorators/method-decorator";

import { RegistrationService } from "../service/registration.service";

import type {
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";

import type { ApiReg002ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg002";

@Controller()
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @Public()
  @Post("/student/registrations/club-registrations/club-registration")
  @UsePipes(new ZodPipe(apiReg001))
  async postStudentRegistrationClubRegistration(
    @Body() body: ApiReg001RequestBody,
  ): Promise<ApiReg001ResponseCreated> {
    const response =
      await this.registrationService.postStudentRegistrationClubRegistration(
        body,
      );
    return response;
  }

  @Public()
  @Get(
    "/student/registrations/club-registrations/club-registration/qualifications/renewal",
  )
  @UsePipes(new ZodPipe(apiReg002))
  async getStudentRegistrationClubRegistrationQualificationRenewal(): Promise<ApiReg002ResponseOk> {
    const orders =
      await this.registrationService.getStudentRegistrationClubRegistrationQualificationRenewal();
    return orders;
  }

  @Public()
  @Get(
    "/student/registrations/club-registrations/club-registration/qualifications/promotional",
  )
  @UsePipes(new ZodPipe(apiReg003))
  async getStudentRegistrationClubRegistrationQualificationPromotional(): Promise<ApiReg002ResponseOk> {
    const orders =
      await this.registrationService.getStudentRegistrationClubRegistrationQualificationPromotional();
    return orders;
  }

  @Student()
  @Get("student/registrations/events")
  async getStudentRegistrationEvents(): Promise<ApiReg004ResponseOK> {
    const result =
      await this.registrationService.getStudentRegistrationEvents();
    return result;
  }
}
