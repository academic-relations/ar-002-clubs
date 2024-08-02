import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from "@nestjs/common";

import apiReg005, {
  ApiReg005RequestBody,
  ApiReg005ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg005";
import { ApiReg006ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg006";
import apiReg007, {
  ApiReg007RequestBody,
  ApiReg007RequestParam,
  ApiReg007ResponseNoContent,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg007";
import apiReg008, {
  ApiReg008RequestParam,
  ApiReg008ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg008";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import { Student } from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import { GetStudent } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import { MemberRegistrationService } from "../service/member-registration.service";

@Controller()
export class MemberRegistrationController {
  constructor(
    private readonly memberRegistrationService: MemberRegistrationService,
  ) {}

  @Student()
  @Post("/studnet/registrations/member-registrations/member-registration")
  @UsePipes(new ZodPipe(apiReg005))
  async postStudentRegistrationsMemberRegistration(
    @GetStudent() user: GetStudent,
    @Body() body: ApiReg005RequestBody,
  ): Promise<ApiReg005ResponseCreated> {
    const result =
      await this.memberRegistrationService.postStudentMemberRegistration(
        user.studentId,
        body.clubId,
      );
    return result;
  }

  @Student()
  @Get("/student/registrations/member-registrations/my")
  async getStudentRegistrationsMemberRegistrationsMy(
    @GetStudent() user: GetStudent,
  ): Promise<ApiReg006ResponseOk> {
    const result =
      await this.memberRegistrationService.getStudentRegistrationsMemberRegistrationsMy(
        user.studentId,
      );
    return result;
  }

  @Student()
  @Patch(
    "/student/registrations/member-registrations/member-registration/:clubId",
  )
  @UsePipes(new ZodPipe(apiReg007))
  async patchStudentRegistrationsMemberRegistration(
    @GetStudent() user: GetStudent,
    @Param() { applyId }: ApiReg007RequestParam,
    @Body() { clubId, applyStatusEnumId }: ApiReg007RequestBody,
  ): Promise<ApiReg007ResponseNoContent> {
    const result =
      await this.memberRegistrationService.patchStudentRegistrationsMemberRegistration(
        user.studentId,
        applyId,
        clubId,
        applyStatusEnumId,
      );
    return result;
  }

  @Student()
  @Get("/student/registrations/member-registrations/club/:clubId")
  @UsePipes(new ZodPipe(apiReg008))
  async getStudentRegistrationsMemberRegistrationsClub(
    @GetStudent() user: GetStudent,
    @Param() { clubId }: ApiReg008RequestParam,
  ): Promise<ApiReg008ResponseOk> {
    const result =
      await this.memberRegistrationService.getStudentRegistrationsMemberRegistrationsClub(
        user.studentId,
        clubId,
      );
    return result;
  }
}
