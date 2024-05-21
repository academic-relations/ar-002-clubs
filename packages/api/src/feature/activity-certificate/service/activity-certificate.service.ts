import { Injectable } from "@nestjs/common";
import { ApiAcf001RequestBody } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf001";
import { ActivityCertificateRepository } from "../repository/activity-certificate.repository";

@Injectable()
export class ActivityCertificateService {
  constructor(
    private readonly activityCertificateRepository: ActivityCertificateRepository,
  ) {}

  async postActivityCertificate(body: ApiAcf001RequestBody) {
    await this.activityCertificateRepository.postActivityCertificate({
      clubId: body.clubId,
      studentId: 1, // TODO: 실제 studentId 적용
      studentPhoneNumber: body.studentPhoneNumber,
      issuedNumber: body.issuedNumber,
      items: body.items, // TODO: item validation
    });
  }

  async getStudentActivityCertificatesClubHistory() {
    const clubHistory =
      await this.activityCertificateRepository.getStudentActivityCertificatesClubHistory();
    return clubHistory;
  }
}
