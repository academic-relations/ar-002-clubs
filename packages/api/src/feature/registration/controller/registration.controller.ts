import { Body, Controller, Post, UsePipes } from "@nestjs/common";

import apiReg001 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
// import apiReg002 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg002";
// import apiReg003 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg003";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import { Public } from "@sparcs-clubs/api/common/util/decorators/method-decorator";

import { RegistrationService } from "../service/registration.service";

import type {
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";

// import type {
//   ApiReg002RequestQuery,
//   ApiReg002ResponseOk,
// } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg002";

@Controller()
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @Public()
  @Post("/student/registrations/club-registrations/club-registration")
  @UsePipes(new ZodPipe(apiReg001))
  async postRegistration(
    @Body() body: ApiReg001RequestBody,
  ): Promise<ApiReg001ResponseCreated> {
    const response = await this.registrationService.postRegistration(body);
    return response;
  }

  // @Get("/student/registrations/club-registrations/club-registration/qualifications/renewal")
  // @UsePipes(new ZodPipe(apiReg002))
  // async getStudentPromotionalPrintingsOrdersMy(
  //   @Query() query: ApiReg002RequestQuery,
  // ): Promise<ApiReg002ResponseOk> {
  //   // TODO: studentId 넘겨주기
  //   const orders =
  //     await this.registrationService.getStudentPromotionalPrintingsOrdersMy(
  //       query,
  //     );

  //   return orders;
  // }
}
