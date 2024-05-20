import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { ZodPipe } from "@sparcs-clubs/api/common/pipes/zod-pipe";
import apiAcf001, {
  ApiAcf001RequestBody,
  ApiAcf001ResponseCreated,
} from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf001";
import { ActivityCertificateService } from "../service/activity-certificate.service";

@Controller()
export class ActivityCertificateController {
  constructor(
    private readonly activityCertificateService: ActivityCertificateService,
  ) {}

  // TODO: Implement zod validation
  @Post("/student/activity-certificates/activity-certificate")
  @UsePipes(new ZodPipe(apiAcf001))
  async postActivityCertificate(
    @Body() body: ApiAcf001RequestBody,
  ): Promise<ApiAcf001ResponseCreated> {
    this.activityCertificateService.postActivityCertificate(body);
    return {};
  }
}
