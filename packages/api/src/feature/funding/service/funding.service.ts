import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import {
  ApiFnd001RequestBody,
  ApiFnd001ResponseCreated,
} from "@sparcs-clubs/interface/api/funding/apiFnd001";
import {
  ApiFnd002RequestParam,
  ApiFnd002ResponseOk,
} from "@sparcs-clubs/interface/api/funding/apiFnd002";
import {
  ApiFnd003RequestBody,
  ApiFnd003RequestParam,
  ApiFnd003ResponseOk,
} from "@sparcs-clubs/interface/api/funding/apiFnd003";
import {
  ApiFnd004RequestParam,
  ApiFnd004ResponseOk,
} from "@sparcs-clubs/interface/api/funding/apiFnd004";
import {
  ApiFnd005RequestQuery,
  ApiFnd005ResponseOk,
} from "@sparcs-clubs/interface/api/funding/apiFnd005";
import {
  ApiFnd006RequestBody,
  ApiFnd006RequestParam,
  ApiFnd006ResponseOk,
} from "@sparcs-clubs/interface/api/funding/apiFnd006";
import { ApiFnd007ResponseOk } from "@sparcs-clubs/interface/api/funding/apiFnd007";
import { ApiFnd008ResponseOk } from "@sparcs-clubs/interface/api/funding/apiFnd008";

import {
  IFundingCommentResponse,
  IFundingResponse,
} from "@sparcs-clubs/interface/api/funding/type/funding.type";

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";
import ActivityPublicService from "@sparcs-clubs/api/feature/activity/service/activity.public.service";
import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";
import FilePublicService from "@sparcs-clubs/api/feature/file/service/file.public.service";
import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import FundingCommentRepository from "../repository/funding.comment.repository";
import FundingRepository from "../repository/funding.repository";

@Injectable()
export default class FundingService {
  constructor(
    private readonly fundingRepository: FundingRepository,
    private readonly fundingCommentRepository: FundingCommentRepository,
    private readonly filePublicService: FilePublicService,
    private readonly userPublicService: UserPublicService,
    private readonly clubPublicService: ClubPublicService,
    private readonly activityPublicService: ActivityPublicService,
  ) {}

  async postStudentFunding(
    body: ApiFnd001RequestBody,
    studentId: number,
  ): Promise<ApiFnd001ResponseCreated> {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }
    if (
      !(await this.clubPublicService.isStudentDelegate(studentId, body.clubId))
    ) {
      throw new HttpException("Student is not delegate", HttpStatus.FORBIDDEN);
    }

    const now = getKSTDate();
    const semesterId = await this.clubPublicService.dateToSemesterId(now);
    const fundingStatusEnum = 1;
    const approvedAmount = 0;

    return this.fundingRepository.insert(body, {
      semesterId,
      fundingStatusEnum,
      approvedAmount,
    });
  }

  async getStudentFunding(
    param: ApiFnd002RequestParam,
    studentId: number,
  ): Promise<ApiFnd002ResponseOk> {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }

    const funding = (await this.fundingRepository.fetch(
      param.id,
    )) as IFundingResponse;

    funding.tradeEvidenceFiles = await this.filePublicService.getFilesByIds(
      funding.tradeEvidenceFiles.flatMap(file => file.id),
    );
    funding.tradeDetailFiles = await this.filePublicService.getFilesByIds(
      funding.tradeDetailFiles.flatMap(file => file.id),
    );

    if (funding.purposeActivity) {
      funding.purposeActivity =
        await this.activityPublicService.getActivitySummary(
          funding.purposeActivity.id,
        );
    }

    if (funding.clubSupplies?.imageFiles) {
      funding.clubSupplies.imageFiles =
        await this.filePublicService.getFilesByIds(
          funding.clubSupplies.imageFiles.flatMap(file => file.id),
        );
    }

    if (funding.clubSupplies?.softwareEvidenceFiles) {
      funding.clubSupplies.softwareEvidenceFiles =
        await this.filePublicService.getFilesByIds(
          funding.clubSupplies.softwareEvidenceFiles.flatMap(file => file.id),
        );
    }

    if (funding.fixture?.imageFiles) {
      funding.fixture.imageFiles = await this.filePublicService.getFilesByIds(
        funding.fixture.imageFiles.flatMap(file => file.id),
      );
    }

    if (funding.fixture?.softwareEvidenceFiles) {
      funding.fixture.softwareEvidenceFiles =
        await this.filePublicService.getFilesByIds(
          funding.fixture.softwareEvidenceFiles.flatMap(file => file.id),
        );
    }

    if (funding.foodExpense) {
      funding.foodExpense.files = await this.filePublicService.getFilesByIds(
        funding.foodExpense.files.flatMap(file => file.id),
      );
    }

    if (funding.laborContract) {
      funding.laborContract.files = await this.filePublicService.getFilesByIds(
        funding.laborContract.files.flatMap(file => file.id),
      );
    }

    if (funding.externalEventParticipationFee) {
      funding.externalEventParticipationFee.files =
        await this.filePublicService.getFilesByIds(
          funding.externalEventParticipationFee.files.flatMap(file => file.id),
        );
    }

    if (funding.publication) {
      funding.publication.files = await this.filePublicService.getFilesByIds(
        funding.publication.files.flatMap(file => file.id),
      );
    }

    if (funding.profitMakingActivity) {
      funding.profitMakingActivity.files =
        await this.filePublicService.getFilesByIds(
          funding.profitMakingActivity.files.flatMap(file => file.id),
        );
    }

    if (funding.jointExpense) {
      funding.jointExpense.files = await this.filePublicService.getFilesByIds(
        funding.laborContract.files.flatMap(file => file.id),
      );
    }

    if (funding.etcExpense) {
      funding.etcExpense.files = await this.filePublicService.getFilesByIds(
        funding.etcExpense.files.flatMap(file => file.id),
      );
    }

    if (funding.publication) {
      funding.publication.files = await this.filePublicService.getFilesByIds(
        funding.publication.files.flatMap(file => file.id),
      );
    }

    if (funding.profitMakingActivity) {
      funding.profitMakingActivity.files =
        await this.filePublicService.getFilesByIds(
          funding.profitMakingActivity.files.flatMap(file => file.id),
        );
    }

    if (funding.jointExpense) {
      funding.jointExpense.files = await this.filePublicService.getFilesByIds(
        funding.jointExpense.files.flatMap(file => file.id),
      );
    }

    if (funding.etcExpense) {
      funding.etcExpense.files = await this.filePublicService.getFilesByIds(
        funding.etcExpense.files.flatMap(file => file.id),
      );
    }

    if (funding.transportation?.passengers) {
      funding.transportation.passengers =
        await this.userPublicService.fetchStudentSummaries(
          funding.transportation.passengers.flatMap(passenger => passenger.id),
        );

      funding.transportation.passengers = funding.transportation.passengers.map(
        passenger => ({
          id: passenger.id,
          name: passenger.name,
          studentNumber: passenger.studentNumber,
        }),
      );
    }

    const comments = (await this.fundingCommentRepository.fetchComments(
      funding.id,
    )) as IFundingCommentResponse[];

    const chargedExecutive =
      await this.userPublicService.fetchExecutiveSummaries(
        comments.map(comment => comment.chargedExecutive.id),
      );

    comments.forEach(comment => {
      // eslint-disable-next-line no-param-reassign
      comment.chargedExecutive = chargedExecutive.find(
        executive => executive.id === comment.chargedExecutive.id,
      );
    });

    funding.comments = comments;

    return funding;
  }

  async putStudentFunding(
    body: ApiFnd003RequestBody,
    param: ApiFnd003RequestParam,
    studentId: number,
  ): Promise<ApiFnd003ResponseOk> {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }
    if (
      !(await this.clubPublicService.isStudentDelegate(studentId, body.clubId))
    ) {
      throw new HttpException("Student is not delegate", HttpStatus.FORBIDDEN);
    }

    const now = getKSTDate();
    const semesterId = await this.clubPublicService.dateToSemesterId(now);
    const fundingStatusEnum = 1;
    const approvedAmount = 0;

    return this.fundingRepository.put(param.id, body, {
      semesterId,
      fundingStatusEnum,
      approvedAmount,
    });
  }

  async deleteStudentFunding(
    studentId: number,
    param: ApiFnd004RequestParam,
  ): Promise<ApiFnd004ResponseOk> {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }
    await this.fundingRepository.delete(param.id);
    return {};
  }

  async getStudentFundings(
    studentId: number,
    query: ApiFnd005RequestQuery,
  ): Promise<ApiFnd005ResponseOk> {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }

    const now = getKSTDate();
    const thisSemester = await this.clubPublicService.dateToSemesterId(now);

    const fundings = await this.fundingRepository.fetchFundingSummaries(
      query.clubId,
      thisSemester,
    );

    const activities = await this.activityPublicService.fetchActivitySummaries(
      fundings.map(funding => funding.purposeActivity.id),
    );

    return {
      fundings: fundings.map(funding => ({
        id: funding.id,
        fundingStatusEnum: funding.fundingStatusEnum,
        purposeActivity: activities.find(
          activity => activity.id === funding.purposeActivity.id,
        ),
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
  ): Promise<ApiFnd006ResponseOk> {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }

    const fundings = await this.fundingRepository.fetchFundingSummaries(
      body.clubId,
      param.semesterId,
    );

    const activities = await this.activityPublicService.fetchActivitySummaries(
      fundings.map(funding => funding.purposeActivity.id),
    );

    return {
      fundings: fundings.map(funding => ({
        id: funding.id,
        fundingStatusEnum: funding.fundingStatusEnum,
        purposeActivity: activities.find(
          activity => activity.id === funding.purposeActivity.id,
        ),
        name: funding.name,
        expenditureAmount: funding.expenditureAmount,
        approvedAmount: funding.approvedAmount,
      })),
    };
  }

  async getStudentFundingActivity(
    studentId: number,
    clubId: number,
  ): Promise<ApiFnd007ResponseOk> {
    const [isStudentDelegate] = await Promise.all([
      this.clubPublicService.isStudentDelegate(studentId, clubId),
    ]);
    if (!isStudentDelegate) {
      throw new HttpException(
        `Student ${studentId} is not the delegate of Club ${clubId}`,
        HttpStatus.FORBIDDEN,
      );
    }

    const activities =
      await this.activityPublicService.fetchAvailableActivitySummaries(clubId);

    return {
      activities,
    };
  }

  async getStudentFundingActivityParticipants(
    activityId: number,
  ): Promise<ApiFnd008ResponseOk> {
    const participants =
      await this.activityPublicService.fetchParticipantStudentSummaries(
        activityId,
      );
    return {
      participants,
    };
  }
}
