import { Body, Controller, Get, Post, UsePipes } from "@nestjs/common";
import apiReg001, {
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import apiReg002, {
  ApiReg002ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg002";
import apiReg003 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg003";
import { ApiReg012ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg012";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import {
  Public,
  Student,
} from "@sparcs-clubs/api/common/util/decorators/method-decorator";

import { GetStudent } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import { ClubRegistrationService } from "../service/club-registration.service";

@Controller()
export class ClubRegistrationController {
  constructor(
    private readonly clubRegistrationService: ClubRegistrationService,
  ) {}

  @Public()
  @Post("/student/registrations/club-registrations/club-registration")
  @UsePipes(new ZodPipe(apiReg001))
  async postStudentRegistrationClubRegistration(
    @Body() body: ApiReg001RequestBody,
  ): Promise<ApiReg001ResponseCreated> {
    const response =
      await this.clubRegistrationService.postStudentRegistrationClubRegistration(
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
      await this.clubRegistrationService.getStudentRegistrationClubRegistrationQualificationRenewal();
    return orders;
  }

  @Public()
  @Get(
    "/student/registrations/club-registrations/club-registration/qualifications/promotional",
  )
  @UsePipes(new ZodPipe(apiReg003))
  async getStudentRegistrationClubRegistrationQualificationPromotional(): Promise<ApiReg002ResponseOk> {
    const orders =
      await this.clubRegistrationService.getStudentRegistrationClubRegistrationQualificationPromotional();
    return orders;
  }

  @Student()
  @Get("/student/registrations/club-registrations/my")
  async getStudentRegistrationsClubRegistrationsMy(
    @GetStudent() user: GetStudent,
  ): Promise<ApiReg012ResponseOk> {
    const response =
      await this.clubRegistrationService.getStudentRegistrationsClubRegistrationsMy(
        user.studentId,
      );
    return response;
  }
}
