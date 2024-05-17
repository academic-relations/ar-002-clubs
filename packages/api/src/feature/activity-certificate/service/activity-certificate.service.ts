// import { Injectable } from "@nestjs/common";
// import { ApiAcf001RequestBody } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf001";
// import { ActivityCertificateRepository } from "../repository/activity-certificate.repository";
// import { ActivityCertificateItemRepository } from "../repository/activity-certificate-item.repository";

// @Injectable()
// export class ActivityCertificateService {
//   constructor(
//     private readonly activityCertificateRepository: ActivityCertificateRepository,
//     private readonly activityCertificateItemRepository: ActivityCertificateItemRepository,
//   ) {}

//   async postActivityCertificate(body: ApiAcf001RequestBody) {
//     await this.activityCertificateRepository.create({
//       clubId: body.clubId,
//       studentId: body.studentId,
//       studentPhoneNumber: body.studentPhoneNumber,
//       issuedNumber: body.issuedNumber,
//     });
//     await this.activityCertificateItemRepository.create({
//       items: body.items,
//     });
//   }
// }
