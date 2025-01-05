import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ApiFnd001RequestBody } from "@sparcs-clubs/interface/api/funding/apiFnd001";
import {
  ApiFnd002RequestParam,
  ApiFnd002ResponseOk,
} from "@sparcs-clubs/interface/api/funding/apiFnd002";
import {
  ApiFnd003RequestBody,
  ApiFnd003RequestParam,
} from "@sparcs-clubs/interface/api/funding/apiFnd003";
import { ApiFnd004RequestParam } from "@sparcs-clubs/interface/api/funding/apiFnd004";
import { ApiFnd005RequestQuery } from "@sparcs-clubs/interface/api/funding/apiFnd005";
import {
  ApiFnd006RequestBody,
  ApiFnd006RequestParam,
} from "@sparcs-clubs/interface/api/funding/apiFnd006";

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";
import ActivityPublicService from "@sparcs-clubs/api/feature/activity/service/activity.public.service";
import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";
import FilePublicService from "@sparcs-clubs/api/feature/file/service/file.public.service";
import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import { FundingResponseDto } from "../model/funding.response-dto.model";
import FundingRepository from "../repository/funding.repository";

@Injectable()
export default class FundingService {
  constructor(
    private fundingRepository: FundingRepository,
    private readonly filePublicService: FilePublicService,
    private readonly userPublicService: UserPublicService,
    private readonly clubPublicSevice: ClubPublicService,
    private readonly activityPublicService: ActivityPublicService,
  ) {}

  async postStudentFunding(body: ApiFnd001RequestBody, studentId: number) {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }
    if (
      !(await this.clubPublicSevice.isStudentDelegate(studentId, body.clubId))
    ) {
      throw new HttpException("Student is not delegate", HttpStatus.FORBIDDEN);
    }

    const now = getKSTDate();
    const semesterId = await this.clubPublicSevice.dateToSemesterId(now);

    const fundingDto: FundingResponseDto = {
      ...body,
      semesterId,
      expenditureDate: new Date(body.expenditureDate),
      isFixture: body.isFixture ?? false,
      isTransportation: body.isTransportation ?? false,
      isFoodExpense: body.isFoodExpense ?? false,
      isLaborContract: body.isLaborContract ?? false,
      isExternalEventParticipationFee:
        body.isExternalEventParticipationFee ?? false,
      isPublication: body.isPublication ?? false,
      isProfitMakingActivity: body.isProfitMakingActivity ?? false,
      isJointExpense: body.isJointExpense ?? false,
      isEtcExpense: body.isEtcExpense ?? false,
      isClubSupplies: body.isClubSupplies ?? false,
      isNonCorporateTransaction: body.isNonCorporateTransaction ?? false,
      tradeDetailExplanation: body.tradeDetailExplanation ?? "",
      tradeEvidenceFiles: body.tradeEvidenceFiles ?? [],
      tradeDetailFiles: body.tradeDetailFiles ?? [],
      clubSuppliesImageFiles: body.clubSuppliesImageFiles ?? [],
      clubSuppliesSoftwareEvidenceFiles:
        body.clubSuppliesSoftwareEvidenceFiles ?? [],
      fixtureImageFiles: body.fixtureImageFiles ?? [],
      fixtureSoftwareEvidenceFiles: body.fixtureSoftwareEvidenceFiles ?? [],
      foodExpenseFiles: body.foodExpenseFiles ?? [],
      laborContractFiles: body.laborContractFiles ?? [],
      externalEventParticipationFeeFiles:
        body.externalEventParticipationFeeFiles ?? [],
      publicationFiles: body.publicationFiles ?? [],
      profitMakingActivityFiles: body.profitMakingActivityFiles ?? [],
      jointExpenseFiles: body.jointExpenseFiles ?? [],
      etcExpenseFiles: body.etcExpenseFiles ?? [],
      transportationPassengers: body.transportationPassengers ?? [],
    };

    const funding = await this.fundingRepository.insert(fundingDto);
    return funding;
  }

  async getStudentFunding(
    param: ApiFnd002RequestParam,
    studentId: number,
  ): Promise<ApiFnd002ResponseOk> {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }

    const funding = await this.fundingRepository.select(param.id);
    if (!funding) {
      throw new HttpException("Funding not found", HttpStatus.NOT_FOUND);
    }

    return funding;
  }

  async putStudentFunding(
    body: ApiFnd003RequestBody,
    param: ApiFnd003RequestParam,
    studentId: number,
  ) {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }
    if (
      !(await this.clubPublicSevice.isStudentDelegate(studentId, body.clubId))
    ) {
      throw new HttpException("Student is not delegate", HttpStatus.FORBIDDEN);
    }

    const now = getKSTDate();
    const semesterId = await this.clubPublicSevice.dateToSemesterId(now);

    const fundingDto: FundingResponseDto = {
      ...body,
      semesterId,
      expenditureDate: new Date(body.expenditureDate),
      isFixture: body.isFixture ?? false,
      isTransportation: body.isTransportation ?? false,
      isFoodExpense: body.isFoodExpense ?? false,
      isLaborContract: body.isLaborContract ?? false,
      isExternalEventParticipationFee:
        body.isExternalEventParticipationFee ?? false,
      isPublication: body.isPublication ?? false,
      isProfitMakingActivity: body.isProfitMakingActivity ?? false,
      isJointExpense: body.isJointExpense ?? false,
      isEtcExpense: body.isEtcExpense ?? false,
      isClubSupplies: body.isClubSupplies ?? false,
      isNonCorporateTransaction: body.isNonCorporateTransaction ?? false,
      tradeDetailExplanation: body.tradeDetailExplanation ?? "",
      tradeEvidenceFiles: body.tradeEvidenceFiles ?? [],
      tradeDetailFiles: body.tradeDetailFiles ?? [],
      clubSuppliesImageFiles: body.clubSuppliesImageFiles ?? [],
      clubSuppliesSoftwareEvidenceFiles:
        body.clubSuppliesSoftwareEvidenceFiles ?? [],
      fixtureImageFiles: body.fixtureImageFiles ?? [],
      fixtureSoftwareEvidenceFiles: body.fixtureSoftwareEvidenceFiles ?? [],
      foodExpenseFiles: body.foodExpenseFiles ?? [],
      laborContractFiles: body.laborContractFiles ?? [],
      externalEventParticipationFeeFiles:
        body.externalEventParticipationFeeFiles ?? [],
      publicationFiles: body.publicationFiles ?? [],
      profitMakingActivityFiles: body.profitMakingActivityFiles ?? [],
      jointExpenseFiles: body.jointExpenseFiles ?? [],
      etcExpenseFiles: body.etcExpenseFiles ?? [],
      transportationPassengers: body.transportationPassengers ?? [],
    };

    const funding = await this.fundingRepository.put(param.id, fundingDto);
    return funding;
  }

  async deleteStudentFunding(studentId: number, param: ApiFnd004RequestParam) {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }
    await this.fundingRepository.delete(param.id);
  }

  async getStudentFundings(studentId: number, query: ApiFnd005RequestQuery) {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }

    const now = getKSTDate();
    const thisSemester = await this.clubPublicSevice.dateToSemesterId(now);

    const fundings = await this.fundingRepository.selectAll(
      query.clubId,
      thisSemester,
    );

    const activityNames = await Promise.all(
      fundings.map(async funding => {
        const activityName =
          await this.activityPublicService.getActivityNameById(
            funding.purposeId,
          );
        return { activityName: activityName[0], id: funding.purposeId };
      }),
    );

    return {
      fundings: fundings.map(funding => ({
        id: funding.id,
        fundingOrderStatusEnumId: funding.fundingOrderStatusEnumId,
        activityName: activityNames.find(name => name.id === funding.purposeId)
          .activityName.name,
        name: funding.name,
        expenditureAmount: funding.expenditureAmount,
        approvedAmount: funding.approvedAmount,
      })),
    };
  }

  async getStudentFundingSemester(
    studentId: number,
    param: ApiFnd006RequestParam,
    body: ApiFnd006RequestBody,
  ) {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }

    const fundings = await this.fundingRepository.selectAll(
      body.clubId,
      param.semesterId,
    );

    const activityNames = await Promise.all(
      fundings.map(async funding => {
        const activityName =
          await this.activityPublicService.getActivityNameById(
            funding.purposeId,
          );
        return { activityName: activityName[0], id: funding.purposeId };
      }),
    );

    return {
      fundings: fundings.map(funding => ({
        id: funding.id,
        fundingOrderStatusEnumId: funding.fundingOrderStatusEnumId,
        activityName: activityNames.find(name => name.id === funding.purposeId)
          .activityName.name,
        name: funding.name,
        expenditureAmount: funding.expenditureAmount,
        approvedAmount: funding.approvedAmount,
      })),
    };
  }
}
