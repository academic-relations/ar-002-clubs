import { Injectable } from "@nestjs/common";

import { ClubRepository } from "@sparcs-clubs/api/common/repository/club.repository";

import { ActivityCertificateRepository } from "../repository/activity-certificate.repository";

import type { ApiAcf001RequestBody } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf001";

@Injectable()
export class ActivityCertificateService {
  constructor(
    private readonly activityCertificateRepository: ActivityCertificateRepository,
    private readonly Club: ClubRepository,
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
    const clubHistory = await this.Club.findClubActivities(1); // TODO: 실제 studentId 적용
    return clubHistory;
  }
}
