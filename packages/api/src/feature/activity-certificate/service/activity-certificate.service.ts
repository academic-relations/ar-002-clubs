import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ClubRepository } from "@sparcs-clubs/api/common/repository/club.repository";
import { StudentRepository } from "@sparcs-clubs/api/common/repository/student.repository";
import { ClubRepresentativeDRepository } from "@sparcs-clubs/api/feature/club/repository/club.club-representative-d.repository";

import { ActivityCertificateRepository } from "../repository/activity-certificate.repository";

import type { ApiAcf001RequestBody } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf001";

import type {
  ApiAcf003RequestQuery,
  ApiAcf003ResponseOk,
} from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf003";
import type {
  ApiAcf007RequestQuery,
  ApiAcf007ResponseOk,
} from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf007";

@Injectable()
export class ActivityCertificateService {
  constructor(
    private readonly activityCertificateRepository: ActivityCertificateRepository,
    private readonly club: ClubRepository,
    private readonly clubRepresentativeDRepository: ClubRepresentativeDRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  async postActivityCertificate(body: ApiAcf001RequestBody) {
    await this.activityCertificateRepository.postActivityCertificate({
      clubId: body.clubId,
      studentId: 605, // TODO: 실제 studentId 적용
      studentPhoneNumber: body.studentPhoneNumber,
      issuedNumber: body.issuedNumber,
      items: body.items, // TODO: item validation
    });
  }

  async getStudentActivityCertificatesClubHistory() {
    const clubHistory = await this.club.findClubActivities(1); // TODO: 실제 studentId 적용
    return clubHistory;
  }

  async getStudentActivityCertificates(
    query: ApiAcf003RequestQuery,
  ): Promise<ApiAcf003ResponseOk> {
    const tempStudentId = 605; // 하승종 id를 임시로 씁시다

    // 조회하는 club의 현재학기 대표가 student가 맞는지 검사합니다.
    const representatives =
      await this.clubRepresentativeDRepository.findRepresentativeIdListByClubId(
        query.clubId,
      );
    if (
      representatives.find(e => e.studentId === tempStudentId) === undefined
    ) {
      throw new HttpException("Permission denied", HttpStatus.FORBIDDEN);
    }

    const total =
      await this.activityCertificateRepository.countActivityCertificatesByClubIdAndCreatedAtIn(
        query.clubId,
        query.startDate,
        query.endDate,
      );

    const items = await Promise.all(
      (
        await this.activityCertificateRepository.findActivityCertificatesPageByClubIdAndCreatedAtIn(
          query,
        )
      ).map(async row => ({
        orderId: row.id,
        studentName: (
          await this.studentRepository.findStudentById(row.studentId)
        ).name,
        issuedNumber: row.issueNumber,
        statusEnum: row.activityCertificateStatusEnum,
        createdAt: row.createdAt,
      })),
    );

    return {
      total,
      items,
      offset: query.pageOffset,
    };
  }

  async getStudentActivityCertificatesMy(
    query: ApiAcf007RequestQuery,
  ): Promise<ApiAcf007ResponseOk> {
    const tempStudentId = 605; // 하승종 id를 임시로 씁시다

    const total =
      await this.activityCertificateRepository.countActivityCertificatesByStudentIdAndCreatedAtIn(
        tempStudentId,
        query.startDate,
        query.endDate,
      );

    const items = await Promise.all(
      (
        await this.activityCertificateRepository.paginateByStudentIdAndCreatedAtIn(
          tempStudentId,
          query,
        )
      ).map(async row => ({
        orderId: row.id,
        studentName: (
          await this.studentRepository.findStudentById(row.studentId)
        ).name,
        issuedNumber: row.issueNumber,
        statusEnum: row.activityCertificateStatusEnum,
        createdAt: row.createdAt,
      })),
    );

    return {
      total,
      items,
      offset: query.pageOffset,
    };
  }
}
