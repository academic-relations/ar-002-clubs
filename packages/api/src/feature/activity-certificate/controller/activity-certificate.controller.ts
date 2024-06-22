import { Body, Controller, Get, Post, UsePipes } from "@nestjs/common";
import apiAcf001, {
  ApiAcf001RequestBody,
  ApiAcf001ResponseCreated,
} from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf001";
import apiAcf002, {
  ApiAcf002ResponseOk,
} from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf002";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import { ActivityCertificateService } from "../service/activity-certificate.service";

@Controller()
export class ActivityCertificateController {
  constructor(
    private readonly activityCertificateService: ActivityCertificateService,
  ) {}

  @Post("/student/activity-certificates/activity-certificate")
  @UsePipes(new ZodPipe(apiAcf001))
  async postActivityCertificate(
    @Body() body: ApiAcf001RequestBody,
  ): Promise<ApiAcf001ResponseCreated> {
    await this.activityCertificateService.postActivityCertificate(body);
    return {};
  }

  @Get("/student/activity-certificates/club-history")
  @UsePipes(new ZodPipe(apiAcf002))
  async getStudentActivityCertificatesClubHistory(): Promise<ApiAcf002ResponseOk> {
    const clubHistory =
      await this.activityCertificateService.getStudentActivityCertificatesClubHistory();
    return clubHistory;
  }
}
