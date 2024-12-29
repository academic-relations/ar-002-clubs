import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ApiFnd001RequestBody } from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd001";
import {
  ApiFnd002RequestParam,
  ApiFnd002ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd002";
import {
  ApiFnd003RequestBody,
  ApiFnd003RequestParam,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd003";
import { ApiFnd004RequestParam } from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd004";
import { ApiFnd005RequestQuery } from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd005";
import {
  ApiFnd006RequestBody,
  ApiFnd006RequestParam,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd006";

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";
import ActivityPublicService from "@sparcs-clubs/api/feature/activity/service/activity.public.service";
import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";
import FilePublicService from "@sparcs-clubs/api/feature/file/service/file.public.service";
import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import FundingRepository from "./funding.repository";

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
    return this.fundingRepository.insertFunding(body);
  }

  // TODO: 최적화
  async getStudentFunding(
    param: ApiFnd002RequestParam,
    studentId: number,
  ): Promise<ApiFnd002ResponseOk> {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }
    const funding = await this.fundingRepository.selectFundingByFundingId(
      param.id,
    );

    const tradeEvidenceFileIds =
      await this.fundingRepository.selectTradeEvidenceFileIdsByFundingId(
        param.id,
      );

    const tradeEvidenceFiles = await Promise.all(
      tradeEvidenceFileIds.map(async id =>
        this.filePublicService.getFileInfoById(id.toString()),
      ),
    );

    const tradeDetailFileIds =
      await this.fundingRepository.selectTradeDetailFileIdsByFundingId(
        param.id,
      );

    const tradeDetailFiles = await Promise.all(
      tradeDetailFileIds.map(async id =>
        this.filePublicService.getFileInfoById(id.toString()),
      ),
    );

    const foodExpenseFileIds =
      await this.fundingRepository.selectFoodExpenseFileIdsByFundingId(
        param.id,
      );

    const foodExpenseFiles = await Promise.all(
      foodExpenseFileIds.map(async id =>
        this.filePublicService.getFileInfoById(id.toString()),
      ),
    );

    const laborContractFileIds =
      await this.fundingRepository.selectLaborContractFileIdsByFundingId(
        param.id,
      );

    const laborContractFiles = await Promise.all(
      laborContractFileIds.map(async id =>
        this.filePublicService.getFileInfoById(id.toString()),
      ),
    );

    const externalEventParticipationFeeFileIds =
      await this.fundingRepository.selectExternalEventParticipationFeeFileIdsByFundingId(
        param.id,
      );

    const externalEventParticipationFeeFiles = await Promise.all(
      externalEventParticipationFeeFileIds.map(async id =>
        this.filePublicService.getFileInfoById(id.toString()),
      ),
    );

    const publicationFileIds =
      await this.fundingRepository.selectPublicationFileIdsByFundingId(
        param.id,
      );

    const publicationFiles = await Promise.all(
      publicationFileIds.map(async id =>
        this.filePublicService.getFileInfoById(id.toString()),
      ),
    );

    const profitMakingActivityFileIds =
      await this.fundingRepository.selectProfitMakingActivityFileIdsByFundingId(
        param.id,
      );

    const profitMakingActivityFiles = await Promise.all(
      profitMakingActivityFileIds.map(async id =>
        this.filePublicService.getFileInfoById(id.toString()),
      ),
    );

    const jointExpenseFileIds =
      await this.fundingRepository.selectJointExpenseFileIdsByFundingId(
        param.id,
      );

    const jointExpenseFiles = await Promise.all(
      jointExpenseFileIds.map(async id =>
        this.filePublicService.getFileInfoById(id.toString()),
      ),
    );

    const etcExpenseFileIds =
      await this.fundingRepository.selectEtcExpenseFileIdsByFundingId(param.id);

    const etcExpenseFiles = await Promise.all(
      etcExpenseFileIds.map(async id =>
        this.filePublicService.getFileInfoById(id.toString()),
      ),
    );

    const clubSuppliesImageFileIds =
      await this.fundingRepository.selectClubSuppliesImageFileIdsByFundingId(
        param.id,
      );

    const clubSuppliesImageFiles = await Promise.all(
      clubSuppliesImageFileIds.map(async id =>
        this.filePublicService.getFileInfoById(id.toString()),
      ),
    );

    const fixtureImageFileIds =
      await this.fundingRepository.selectFixtureImageFileIdsByFundingId(
        param.id,
      );

    const fixtureImageFiles = await Promise.all(
      fixtureImageFileIds.map(async id =>
        this.filePublicService.getFileInfoById(id.toString()),
      ),
    );

    const clubSuppliesSoftwareEvidenceFileIds =
      await this.fundingRepository.selectClubSuppliesSoftwareEvidenceFileIdsByFundingId(
        param.id,
      );

    const clubSuppliesSoftwareEvidenceFiles = await Promise.all(
      clubSuppliesSoftwareEvidenceFileIds.map(async id =>
        this.filePublicService.getFileInfoById(id.toString()),
      ),
    );

    const fixtureSoftwareEvidenceFileIds =
      await this.fundingRepository.selectFixtureSoftwareEvidenceFileIdsByFundingId(
        param.id,
      );

    const fixtureSoftwareEvidenceFiles = await Promise.all(
      fixtureSoftwareEvidenceFileIds.map(async id =>
        this.filePublicService.getFileInfoById(id.toString()),
      ),
    );

    const transportationPassengerTIds =
      await this.fundingRepository.selectPassengerStudentIdsByFundingId(
        param.id,
      );

    const transportationPassengers = await Promise.all(
      transportationPassengerTIds.map(async id => {
        const student = await this.userPublicService.getStudentByTId({ id });
        return {
          name: student.name,
          studentNumber: student.number.toString(),
        };
      }),
    );

    return {
      ...funding,

      transportationPassengers,

      tradeEvidenceFiles,
      tradeDetailFiles,

      foodExpenseFiles,
      laborContractFiles,
      externalEventParticipationFeeFiles,
      publicationFiles,
      profitMakingActivityFiles,
      jointExpenseFiles,
      etcExpenseFiles,

      clubSuppliesImageFiles,
      fixtureImageFiles,
      clubSuppliesSoftwareEvidenceFiles,
      fixtureSoftwareEvidenceFiles,
    };
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
    return this.fundingRepository.putStudentFunding(body, param.id);
  }

  async deleteStudentFunding(studentId: number, param: ApiFnd004RequestParam) {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }
    return this.fundingRepository.deleteStudentFunding(param.id);
  }

  async getStudentFundings(studentId: number, query: ApiFnd005RequestQuery) {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }

    const now = getKSTDate();
    // TODO: 지원금 학기 기준으로 semeterId 설정
    const thisSemester = await this.clubPublicSevice.dateToSemesterId(now);

    const fundings =
      await this.fundingRepository.selectFundingsSemesterByClubId(
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

    // TODO: 지원금 학기 기준으로 semeterId 설정
    const fundings =
      await this.fundingRepository.selectFundingsSemesterByClubId(
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
