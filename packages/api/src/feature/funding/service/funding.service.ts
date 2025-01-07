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

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";
import ActivityPublicService from "@sparcs-clubs/api/feature/activity/service/activity.public.service";
import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";
import FilePublicService from "@sparcs-clubs/api/feature/file/service/file.public.service";
import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import { Funding } from "../model/funding.model";
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

  async postStudentFunding(
    body: ApiFnd001RequestBody,
    studentId: number,
  ): Promise<ApiFnd001ResponseCreated> {
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

    const funding = new Funding(body);
    funding.semesterId = semesterId;
    return this.fundingRepository.insert(funding);
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

    funding.tradeEvidenceFiles.forEach(async file => {
      const { name, link } = await this.filePublicService.getFileInfoById(
        file.id,
      );
      // eslint-disable-next-line no-param-reassign
      file.name = name;
      // eslint-disable-next-line no-param-reassign
      file.url = link;
    });

    funding.tradeDetailFiles.forEach(async file => {
      const { name, link } = await this.filePublicService.getFileInfoById(
        file.id,
      );
      // eslint-disable-next-line no-param-reassign
      file.name = name;
      // eslint-disable-next-line no-param-reassign
      file.url = link;
    });

    funding.foodExpense.files.forEach(async file => {
      const { name, link } = await this.filePublicService.getFileInfoById(
        file.id,
      );
      // eslint-disable-next-line no-param-reassign
      file.name = name;
      // eslint-disable-next-line no-param-reassign
      file.url = link;
    });

    funding.laborContract.files.forEach(async file => {
      const { name, link } = await this.filePublicService.getFileInfoById(
        file.id,
      );
      // eslint-disable-next-line no-param-reassign
      file.name = name;
      // eslint-disable-next-line no-param-reassign
      file.url = link;
    });

    funding.externalEventParticipationFee.files.forEach(async file => {
      const { name, link } = await this.filePublicService.getFileInfoById(
        file.id,
      );
      // eslint-disable-next-line no-param-reassign
      file.name = name;
      // eslint-disable-next-line no-param-reassign
      file.url = link;
    });

    funding.publication.files.forEach(async file => {
      const { name, link } = await this.filePublicService.getFileInfoById(
        file.id,
      );
      // eslint-disable-next-line no-param-reassign
      file.name = name;
      // eslint-disable-next-line no-param-reassign
      file.url = link;
    });

    funding.profitMakingActivity.files.forEach(async file => {
      const { name, link } = await this.filePublicService.getFileInfoById(
        file.id,
      );
      // eslint-disable-next-line no-param-reassign
      file.name = name;
      // eslint-disable-next-line no-param-reassign
      file.url = link;
    });

    funding.jointExpense.files.forEach(async file => {
      const { name, link } = await this.filePublicService.getFileInfoById(
        file.id,
      );
      // eslint-disable-next-line no-param-reassign
      file.name = name;
      // eslint-disable-next-line no-param-reassign
      file.url = link;
    });

    funding.etcExpense.files.forEach(async file => {
      const { name, link } = await this.filePublicService.getFileInfoById(
        file.id,
      );
      // eslint-disable-next-line no-param-reassign
      file.name = name;
      // eslint-disable-next-line no-param-reassign
      file.url = link;
    });

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
      !(await this.clubPublicSevice.isStudentDelegate(studentId, body.clubId))
    ) {
      throw new HttpException("Student is not delegate", HttpStatus.FORBIDDEN);
    }

    const now = getKSTDate();
    const semesterId = await this.clubPublicSevice.dateToSemesterId(now);

    const funding = new Funding(body);
    funding.semesterId = semesterId;

    return this.fundingRepository.put(param.id, funding);
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
    const thisSemester = await this.clubPublicSevice.dateToSemesterId(now);

    const fundings = await this.fundingRepository.selectAll(
      query.clubId,
      thisSemester,
    );

    const activities = await Promise.all(
      fundings.map(async funding => {
        const activityName =
          await this.activityPublicService.getActivityNameById(
            funding.purposeId,
          );
        return {
          name: activityName[0].name ?? "활동보고서로 증빙이 불가능한 물품",
          id: funding.purposeId,
        };
      }),
    );

    return {
      fundings: fundings.map(funding => ({
        id: funding.id,
        fundingOrderStatusEnumId: funding.fundingOrderStatusEnumId,
        purposeId: funding.purposeId,
        activityName: activities.find(
          activity => activity.id === funding.purposeId,
        ).name,
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

    const fundings = await this.fundingRepository.selectAll(
      body.clubId,
      param.semesterId,
    );

    const activities = await Promise.all(
      fundings.map(async funding => {
        const activityName =
          await this.activityPublicService.getActivityNameById(
            funding.purposeId,
          );
        return {
          name: activityName[0].name ?? "활동보고서로 증빙이 불가능한 물품",
          id: funding.purposeId,
        };
      }),
    );

    return {
      fundings: fundings.map(funding => ({
        id: funding.id,
        fundingOrderStatusEnumId: funding.fundingOrderStatusEnumId,
        purposeId: funding.purposeId,
        activityName: activities.find(
          activity => activity.id === funding.purposeId,
        ).name,
        name: funding.name,
        expenditureAmount: funding.expenditureAmount,
        approvedAmount: funding.approvedAmount,
      })),
    };
  }
}
