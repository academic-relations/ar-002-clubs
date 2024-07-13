import { Body, Controller, Get, Post, Query, UsePipes } from "@nestjs/common";
import apiAcf001, {
  ApiAcf001RequestBody,
  ApiAcf001ResponseCreated,
} from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf001";
import apiAcf002, {
  ApiAcf002ResponseOk,
} from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf002";
import apiAcf003 from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf003";
import apiAcf007 from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf007";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import { ActivityCertificateService } from "../service/activity-certificate.service";

import type {
  ApiAcf003RequestQuery,
  ApiAcf003ResponseOk,
} from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf003";
import type {
  ApiAcf007RequestQuery,
  ApiAcf007ResponseOk,
} from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf007";

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

  // // TODO: add club validation
  @Get("/student/activity-certificates")
  @UsePipes(new ZodPipe(apiAcf003))
  async getStudentActivityCertificates(
    @Query() query: ApiAcf003RequestQuery,
  ): Promise<ApiAcf003ResponseOk> {
    const orders =
      await this.activityCertificateService.getStudentActivityCertificates(
        query,
      );

    return orders;
  }

  @Get("/student/activity-certificates/my")
  @UsePipes(new ZodPipe(apiAcf007))
  async getStudentActivityCertificatesMy(
    @Query() query: ApiAcf007RequestQuery,
  ): Promise<ApiAcf007ResponseOk> {
    const orders =
      await this.activityCertificateService.getStudentActivityCertificatesMy(
        query,
      );

    return orders;
  }
}
