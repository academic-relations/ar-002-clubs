import { ClubStudentTRepository } from "@sparcs-clubs/api/common/repository/club-student-t.repository";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ApiCms001ResponseOK } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms001";
import { ApiCms002ResponseOK } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms002";
import { ApiCms003ResponseCreated } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms003";
import { isEmptyObject } from "@sparcs-clubs/api/common/util/util";
import { GetCommonSpaceUsageOrderRepository } from "../repository/getCommonSpaceUsageOrder.repository";
import { CommonSpaceRepository } from "../repository/common-space.repository";
import { CommonSpaceUsageOrderDRepository } from "../repository/common-space-usage-order-d.repository";
import { Reservation } from "../dto/common-space.dto";
import { canMakeReservation } from "./calculate-time.util";

@Injectable()
export class CommonSpaceService {
  constructor(
    private readonly commonSpaceRepository: CommonSpaceRepository,
    private readonly getCommonSpaceUsageOrderRepository: GetCommonSpaceUsageOrderRepository,
    private readonly commonSpaceUsageOrderDRepository: CommonSpaceUsageOrderDRepository,
    private readonly clubStudentTRepository: ClubStudentTRepository,
  ) {}

  async getCommonSpaces(): Promise<ApiCms001ResponseOK> {
    const result = await this.commonSpaceRepository.getAllCommonSpaces();
    return { commonSpaces: result };
  }

  async getCommonSpaceUsageOrder(
    spaceId,
    startDate,
    endDate,
  ): Promise<ApiCms002ResponseOK> {
    // await this.commonSpaceRepository.findCommonSpaceById(spaceId);
    const result =
      await this.getCommonSpaceUsageOrderRepository.findBySpaceIdAndStartTermBetweenAndEndTermBetween(
        spaceId,
        startDate,
        endDate,
      );
    return result;
  }

  // spaceId로 공용공간 타입 검색& available hours 두개 가져오기
  // commonspaceuseageorder에서 현재 동아리가 현재 공간에 신청한 시간 가져오기
  // 같은날 신청한 내역이 있다면 day 같은 주에 신청한 내역이 있다면 week로 가능한지 확인
  // 연장에 대해서는 어떻게 적용해야하지?
  async postStudentCommonSpaceUsageOrder(
    spaceId: number,
    clubId: number,
    studentId: number,
    startTerm: Date,
    endTerm: Date,
  ): Promise<ApiCms003ResponseCreated> {
    const commonSpace =
      await this.commonSpaceRepository.findCommonSpaceById(spaceId);
    const isReserved = await this.getCommonSpaceUsageOrder(
      spaceId,
      startTerm,
      endTerm,
    );
    if (isReserved.usageOrders.length > 0) {
      throw new HttpException(
        "Already used by other order.",
        HttpStatus.BAD_REQUEST,
      );
    }
    const student =
      await this.clubStudentTRepository.findClubStudentByClubIdAndStudentId(
        clubId,
        studentId,
      );
    if (isEmptyObject(student.student)) {
      throw new HttpException(
        "Student is not in the club.",
        HttpStatus.NOT_FOUND,
      );
    }

    const prevReservation: Reservation[] =
      await this.commonSpaceUsageOrderDRepository.findBySpaceIdAndClubIdAndStartTermBetweenAndEndTermBetween(
        spaceId,
        clubId,
        startTerm,
        endTerm,
      );
    const isAvailable = canMakeReservation(
      startTerm,
      endTerm,
      prevReservation,
      commonSpace.availableHoursPerDay,
      commonSpace.availableHoursPerWeek,
    );
    if (isAvailable) {
      const result =
        await this.commonSpaceUsageOrderDRepository.setCommonSpaceUsageOrderD(
          spaceId,
          clubId,
          student.student.id,
          student.student.phoneNumber,
          startTerm,
          endTerm,
        );
      return result;
    }
    throw new HttpException("Available time exceeded", HttpStatus.BAD_REQUEST);
  }
}
