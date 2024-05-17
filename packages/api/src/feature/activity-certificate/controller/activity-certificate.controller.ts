// import { Controller, Post, Body } from "@nestjs/common";
// import {
//   ApiAcf001RequestBody,
//   ApiAcf001ResponseCreated,
// } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf001";
// import { ActivityCertificateService } from "../service/activity-certificate.service";

// @Controller()
// export class ActivityCertificateController {
//   constructor(
//     private readonly activityCertificateService: ActivityCertificateService,
//   ) {}
//   // TODO: Implement zod validation
//   @Post("/student/activity-certificates/activity-certificate")
//   async postActivityCertificate(
//     @Body() body: ApiAcf001RequestBody,
//   ): Promise<ApiAcf001ResponseCreated> {
//     this.activityCertificateService.postActivityCertificate(body);
//     return;
//   }
// }
