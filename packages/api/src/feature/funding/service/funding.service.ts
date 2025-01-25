import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { IFileSummary } from "@sparcs-clubs/interface/api/file/type/file.type";
import {
  ApiFnd001RequestBody,
  ApiFnd001ResponseCreated,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd001";
import {
  ApiFnd002RequestParam,
  ApiFnd002ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd002";
import {
  ApiFnd003RequestBody,
  ApiFnd003RequestParam,
  ApiFnd003ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd003";
import {
  ApiFnd004RequestParam,
  ApiFnd004ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd004";
import {
  ApiFnd005RequestQuery,
  ApiFnd005ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd005";
import {
  ApiFnd006RequestBody,
  ApiFnd006RequestParam,
  ApiFnd006ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd006";
import { ApiFnd007ResponseOk } from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd007";
import { ApiFnd012ResponseOk } from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd012";
import { ApiFnd013ResponseCreated } from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd013";

import {
  IFunding,
  IFundingComment,
  IFundingCommentRequestCreate,
  IFundingResponse,
} from "@sparcs-clubs/interface/api/funding/type/funding.type";
import { IExecutive } from "@sparcs-clubs/interface/api/user/type/user.type";
import { FundingStatusEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";
import ActivityPublicService from "@sparcs-clubs/api/feature/activity/service/activity.public.service";
import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";
import FilePublicService from "@sparcs-clubs/api/feature/file/service/file.public.service";
import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import { MFunding } from "../model/funding.model";
import FundingCommentRepository from "../repository/funding.comment.repository";
import FundingDeadlineRepository from "../repository/funding.deadline.repository";
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
    private fundingDeadlineRepository: FundingDeadlineRepository,
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
      !(await this.clubPublicService.isStudentDelegate(studentId, body.club.id))
    ) {
      throw new HttpException("Student is not delegate", HttpStatus.FORBIDDEN);
    }

    const now = getKSTDate();
    const activityD = await this.activityPublicService.fetchLastActivityD(now);
    const fundingStatusEnum = 1;
    const approvedAmount = 0;

    return this.fundingRepository.insert(body, {
      activityD,
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

    const comments = await this.fundingCommentRepository.fetchAll(funding.id);

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
    funding.comments = comments.map(comment => ({
      ...comment,
      chargedExecutive: chargedExecutive.find(
        executive => executive.id === comment.chargedExecutive.id,
      ),
    }));

    return funding;
  }

  private async transformFundingToResponse(
    funding: MFunding,
  ): Promise<IFundingResponse> {
    const purposeActivity = funding.purposeActivity
      ? await this.activityPublicService.getActivitySummary(
          funding.purposeActivity.id,
        )
      : undefined;

    // 채울 곳
    const resolvedFiles = {
      tradeEvidenceFiles: await this.resolveFilesOrNull(
        funding.tradeEvidenceFiles,
      ),
      tradeDetailFiles: await this.resolveFilesOrNull(funding.tradeDetailFiles),

      foodExpense: await this.resolveFilesOrNull(funding.foodExpense),
      laborContract: await this.resolveFilesOrNull(funding.laborContract),
      externalEventParticipationFee: await this.resolveFilesOrNull(
        funding.externalEventParticipationFee,
      ),
      publication: await this.resolveFilesOrNull(funding.publication),
      profitMakingActivity: await this.resolveFilesOrNull(
        funding.profitMakingActivity,
      ),
      jointExpense: await this.resolveFilesOrNull(funding.jointExpense),
      etcExpense: await this.resolveFilesOrNull(funding.etcExpense),
      nonCorporateTransaction: await this.resolveFilesOrNull(
        funding.nonCorporateTransaction,
      ),
      // 구분선

      clubSupplies: funding.clubSupplies
        ? {
            ...funding.clubSupplies,
            imageFiles: await this.resolveFilesOrNull(
              funding.clubSupplies.imageFiles,
            ),
            softwareEvidenceFiles: await this.resolveFilesOrNull(
              funding.clubSupplies.softwareEvidenceFiles,
            ),
          }
        : undefined,
      fixture: funding.fixture
        ? {
            ...funding.fixture,
            imageFiles: await this.resolveFilesOrNull(
              funding.fixture.imageFiles,
            ),
            softwareEvidenceFiles: await this.resolveFilesOrNull(
              funding.fixture.softwareEvidenceFiles,
            ),
          }
        : undefined,
    };

    let transportation;
    if (funding.transportation && funding.transportation.passengers) {
      transportation = {
        ...funding.transportation,
        passengers: await this.userPublicService.fetchStudentSummaries(
          funding.transportation.passengers.map(passenger => passenger.id),
        ),
      };
    }

    const comments = await this.fundingCommentRepository.fetchAll(funding.id);

    const chargedExecutive =
      await this.userPublicService.fetchExecutiveSummaries(
        comments.map(comment => comment.chargedExecutive.id),
      );

    const commentResponses = comments.map(comment => ({
      ...comment,
      chargedExecutive: chargedExecutive.find(
        executive => executive.id === comment.chargedExecutive.id,
      ),
    }));

    return {
      ...funding,
      purposeActivity,
      ...resolvedFiles,
      transportation,
      comments: commentResponses,
    };
  }

  // 메서드 오버로딩 선언부
  private async resolveFilesOrNull(items: undefined): Promise<undefined>;
  private async resolveFilesOrNull(
    items: { id: string }[],
  ): Promise<IFileSummary[]>;
  private async resolveFilesOrNull<T extends { files: { id: string }[] }>(
    items: T,
  ): Promise<Omit<T, "files"> & { files: IFileSummary[] }>;

  // 구현부
  private async resolveFilesOrNull<T extends { files: { id: string }[] }>(
    items: T | undefined | { id: string }[],
  ): Promise<
    undefined | IFileSummary[] | (Omit<T, "files"> & { files: IFileSummary[] })
  > {
    if (!items) {
      return undefined; // items가 undefined이면 undefined 반환
    }

    if (Array.isArray(items)) {
      // items가 배열인 경우 처리
      const resolvedFiles = await this.filePublicService.getFilesByIds(
        items.map(file => file.id),
      );
      return resolvedFiles; // FileSummary[] 반환
    }

    if ("files" in items) {
      // items에 files 속성이 있는 경우 처리
      const resolvedFiles = await this.filePublicService.getFilesByIds(
        items.files.map(file => file.id),
      );
      return { ...items, files: resolvedFiles }; // files가 IFileSummary[]로 변환된 객체 반환
    }
    return undefined;
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
      !(await this.clubPublicService.isStudentDelegate(studentId, body.club.id))
    ) {
      throw new HttpException("Student is not delegate", HttpStatus.FORBIDDEN);
    }

    const now = getKSTDate();
    const activityD = await this.activityPublicService.fetchLastActivityD(now);
    const fundingStatusEnum = 1;
    const approvedAmount = 0;

    return this.fundingRepository.put(param.id, body, {
      activityD,
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

    const fundings = await this.fundingRepository.fetchSummaries(
      query.clubId,
      thisSemester,
    );

    const activities = await this.activityPublicService.fetchSummaries(
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

  async getStudentFundingActivityDuration(
    studentId: number,
    param: ApiFnd006RequestParam,
    body: ApiFnd006RequestBody,
  ): Promise<ApiFnd006ResponseOk> {
    const user = await this.userPublicService.getStudentById({ id: studentId });
    if (!user) {
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND);
    }

    const fundings = await this.fundingRepository.fetchSummaries(
      body.clubId,
      param.activityDId,
    );

    const activities = await this.activityPublicService.fetchSummaries(
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

  /**
   * @description 지원금 신청의 작성 기한을 확인합니다.
   * @returns 현재 시점의 지원금 신청 마감 기한과 대상 활동 기간을 리턴합니다.
   */
  async getPublicFundingsDeadline(): Promise<ApiFnd007ResponseOk> {
    const today = getKSTDate();

    const [targetDuration, deadline] = await Promise.all([
      this.activityPublicService.fetchLastActivityD(),
      this.fundingDeadlineRepository.fetch(today),
    ]);

    return {
      targetDuration,
      deadline,
    };
  }

  /**
   * @description 집행부원이 검토를 위해 지원금 신청을 조회합니다.
   * @returns 집행부원 검토를 위한 지원금 신청 정보를 리턴합니다.
   * 들어온 executive Id가 현재 집행부원인지 확인합니다.
   */
  async getExecutiveFunding(
    executiveId: IExecutive["id"],
    id: IFunding["id"],
  ): Promise<ApiFnd012ResponseOk> {
    await this.userPublicService.checkCurrentExecutive(executiveId);

    const funding = (await this.fundingRepository.fetch(
      id,
    )) as IFundingResponse; // TODO: 이거 이래도 되나? comments 필드가 없는데. 에러 안나나?

    const fundingResponse = await this.transformFundingToResponse(funding);
    return fundingResponse;
  }

  /**
   * @description 집행부원으로서 지원금 신청에 comment를 남깁니다.
   * @returns
   */
  async postExecutiveFundingComment(
    executiveId: IExecutive["id"],
    id: IFunding["id"],
    fundingStatusEnum: IFundingComment["fundingStatusEnum"],
    approvedAmount: IFundingComment["approvedAmount"],
    content: IFundingComment["content"],
  ): Promise<ApiFnd013ResponseCreated> {
    if (approvedAmount < 0) {
      throw new HttpException(
        "승인 금액은 0 이상이어야 합니다.",
        HttpStatus.BAD_REQUEST,
      );
    }
    if (fundingStatusEnum === FundingStatusEnum.Applied) {
      throw new HttpException(
        "대기 상태로는 바꿀 수 없습니다.",
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      fundingStatusEnum === FundingStatusEnum.Rejected &&
      approvedAmount !== 0
    ) {
      throw new HttpException(
        "반려 상태에서는 승인 금액을 0으로 설정해야 합니다.",
        HttpStatus.BAD_REQUEST,
      );
    }
    const { expenditureAmount } = await this.fundingRepository.fetch(id);
    if (approvedAmount > expenditureAmount) {
      throw new HttpException(
        "승인 금액이 지출 금액보다 많을 수 없습니다.",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      fundingStatusEnum === FundingStatusEnum.Approved &&
      expenditureAmount !== approvedAmount
    ) {
      throw new HttpException(
        "승인을 위해선 전체 금액의 전부가 승인되어야 합니다. 부분 승인을 이용해 주세요.",
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      fundingStatusEnum === FundingStatusEnum.Partial &&
      (approvedAmount === 0 || approvedAmount === expenditureAmount)
    ) {
      throw new HttpException(
        "승인 상태에서는 승인 금액이 0이 될 수 없습니다.",
        HttpStatus.BAD_REQUEST,
      );
    }

    const fundingComment = await this.fundingCommentRepository.withTransaction(
      async tx => {
        const comment = await this.fundingCommentRepository.insertTx(tx, {
          fundingStatusEnum,
          approvedAmount,
          funding: { id },
          chargedExecutive: { id: executiveId },
          content,
        } as IFundingCommentRequestCreate);
        const funding = await this.fundingRepository.patchStatusTx(tx, {
          id,
          fundingStatusEnum,
          approvedAmount,
          commentedAt: comment.createdAt,
        });

        // funding 이랑 comment 의 값들이 다르면 에러
        if (!comment.isFinalComment(funding)) {
          throw new HttpException(
            "Funding and Comment Has Different Value",
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }

        return comment;
      },
    );

    return fundingComment;
  }
}
