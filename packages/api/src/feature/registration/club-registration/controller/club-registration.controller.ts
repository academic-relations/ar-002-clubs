import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from "@nestjs/common";
import apiReg001, {
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import apiReg002, {
  ApiReg002ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg002";
import apiReg003 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg003";
import apiReg009, {
  ApiReg009RequestBody,
  ApiReg009RequestParam,
  ApiReg009ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg009";
import apiReg010, {
  ApiReg010RequestParam,
  ApiReg010ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg010";
import apiReg011, {
  ApiReg011RequestParam,
  ApiReg011ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg011";
import { ApiReg012ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg012";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import { Student } from "@sparcs-clubs/api/common/util/decorators/method-decorator";

import { GetStudent } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import { ClubRegistrationService } from "../service/club-registration.service";

@Controller()
export class ClubRegistrationController {
  constructor(
    private readonly clubRegistrationService: ClubRegistrationService,
  ) {}

  @Student()
  @Post("/student/registrations/club-registrations/club-registration")
  @UsePipes(new ZodPipe(apiReg001))
  async postStudentRegistrationClubRegistration(
    @GetStudent() user: GetStudent,
    @Body() body: ApiReg001RequestBody,
  ): Promise<ApiReg001ResponseCreated> {
    const response =
      await this.clubRegistrationService.postStudentRegistrationClubRegistration(
        user.studentId,
        body,
      );
    return response;
  }

  @Student()
  @Get(
    "/student/registrations/club-registrations/club-registration/qualifications/renewal",
  )
  @UsePipes(new ZodPipe(apiReg002))
  async getStudentRegistrationClubRegistrationQualificationRenewal(): Promise<ApiReg002ResponseOk> {
    const orders =
      await this.clubRegistrationService.getStudentRegistrationClubRegistrationQualificationRenewal();
    return orders;
  }

  @Student()
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
  @Put("/student/registrations/club-registrations/club-registration/:id")
  @UsePipes(new ZodPipe(apiReg009))
  async putStudentRegistrationsClubRegistration(
    @GetStudent() user: GetStudent,
    @Param() { applyId }: ApiReg009RequestParam,
    @Body() body: ApiReg009RequestBody,
  ): Promise<ApiReg009ResponseOk> {
    const result =
      await this.clubRegistrationService.putStudentRegistrationsClubRegistration(
        user.studentId,
        applyId,
        body,
      );
    return result;
  }

  @Student()
  @Delete("/student/registrations/club-registration/:applyId")
  @UsePipes(new ZodPipe(apiReg010))
  async deleteStudentRegistrationsClubRegistration(
    @GetStudent() user: GetStudent,
    @Param() { applyId }: ApiReg010RequestParam,
  ): Promise<ApiReg010ResponseOk> {
    const result =
      await this.clubRegistrationService.deleteStudentRegistrationsClubRegistration(
        user.studentId,
        applyId,
      );
    return result;
  }

  @Student()
  @Get("/student/registrations/club-registrations/:applyId")
  @UsePipes(new ZodPipe(apiReg011))
  async getStudentRegistrationsClubRegistration(
    @GetStudent() user: GetStudent,
    @Param() { applyId }: ApiReg011RequestParam,
  ): Promise<ApiReg011ResponseOk> {
    const result =
      await this.clubRegistrationService.getStudentRegistrationsClubRegistration(
        user.studentId,
        applyId,
      );
    return result;
  }

  @Student()
  @Get("/student/registrations/club-registrations/my")
  async getStudentRegistrationsClubRegistrationsMy(
    @GetStudent() user: GetStudent,
  ): Promise<ApiReg012ResponseOk> {
    const result =
      await this.clubRegistrationService.getStudentRegistrationsClubRegistrationsMy(
        user.studentId,
      );
    return result;
  }
}
