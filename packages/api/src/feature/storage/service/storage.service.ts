import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ApiSto001RequestBody } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto001";
import {
  ApiSto002RequestQuery,
  ApiSto002ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto002";
// import {
//   ApiSto003RequestQuery,
//   ApiSto003ResponseOk,
// } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto003";
import { ApiSto004ResponseOk } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto004";
import { ApiSto005ResponseOk } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto005";
import { ApiSto006RequestBody } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto006";
import { ApiSto007RequestBody } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto007";
import { ApiSto008RequestBody } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto008";
import { ApiSto009ResponseOk } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto009";
import { ApiSto010RequestBody } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto010";
import { ApiSto011RequestBody } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto011";
import {
  ApiSto012RequestQuery,
  ApiSto012ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto012";
import { ApiSto013ResponseOk } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto013";

import ClubPublicService from "@sparcs-clubs/api/feature/club/service/club.public.service";

import { StorageRepository } from "../repository/storage.repository";

@Injectable()
export class StorageService {
  constructor(
    private readonly storageRepository: StorageRepository,
    private clubPublicService: ClubPublicService,
  ) {}

  /**
   * @param studentId 학생 id
   * @param clubId 동아리 id
   * @description 학생이 해당 동아리의 대표자 또는 대의원이 아닌 경우 403 exception을 throw 합니다.
   * activity.service.ts의 동명의 함수를 참조하였습니다.
   */
  private async checkIsStudentDelegate(param: {
    studentId: number;
    clubId: number;
  }) {
    if (
      !(await this.clubPublicService.isStudentDelegate(
        param.studentId,
        param.clubId,
      ))
    )
      throw new HttpException(
        "It seems that you are not the delegate of the club.",
        HttpStatus.FORBIDDEN,
      );
  }

  async postStudentStorageApplication(body: ApiSto001RequestBody) {
    await this.checkIsStudentDelegate({
      studentId: body.studentId,
      clubId: body.clubId,
    });

    const isCreationSucceed =
      await this.storageRepository.createApplication(body);
    if (!isCreationSucceed) {
      throw new HttpException(
        "Failed to create application",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return isCreationSucceed;
  }

  async getStudentStorageApplications(
    query: ApiSto002RequestQuery,
    studentId: number,
  ): Promise<ApiSto002ResponseOk> {
    await this.checkIsStudentDelegate({
      studentId,
      clubId: query.clubId,
    });

    const { clubId, pageOffset, itemCount } = query;
    const { paginatedItems, total } =
      await this.storageRepository.getApplications(
        clubId,
        pageOffset,
        itemCount,
      );

    return {
      items: paginatedItems,
      total,
      offset: pageOffset,
    };
  }

  // async getMyStorageApplications(
  //   query: ApiSto003RequestQuery,
  //   studentId: number,
  // ): Promise<ApiSto003ResponseOk> {
  //   const { pageOffset, itemCount } = query;
  //   const { paginatedItems, total } =
  //     await this.storageRepository.getMyApplications(
  //       studentId,
  //       pageOffset,
  //       itemCount,
  //     );

  //   return {
  //     items: paginatedItems,
  //     total,
  //     offset: pageOffset,
  //   };
  // }

  // 신청서의 정보를 불러오는 함수로, Sto004, 005, 009에서 사용합니다.
  private async getStorageApplication(
    id: number,
  ): Promise<ApiSto004ResponseOk> {
    const application = await this.storageRepository.getApplication(id);

    const nonStandardItems =
      await this.storageRepository.getNonStandardItems(id);

    return { ...application, nonStandardItems };
  }

  async getStudentStorageApplication(
    id: number,
    studentId: number,
  ): Promise<ApiSto004ResponseOk> {
    const application = await this.getStorageApplication(id);

    await this.checkIsStudentDelegate({
      studentId,
      clubId: application.clubId,
    });

    return application;
  }

  async getExecutiveStorageApplication(
    id: number,
  ): Promise<ApiSto005ResponseOk> {
    return this.getStorageApplication(id);
  }

  async putStudentStorageApplication(
    applicationId: number,
    body: ApiSto006RequestBody,
    studentId: number,
  ) {
    const application = await this.getStorageApplication(applicationId);

    if (application.studentId !== studentId)
      throw new HttpException(
        "It seems that you're not the creator of the application.",
        HttpStatus.FORBIDDEN,
      );

    const isUpdateSucceed = this.storageRepository.updateApplication(
      applicationId,
      body,
    );

    if (!isUpdateSucceed)
      throw new HttpException(
        "Failed to update",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  async putExecutiveStorageApplication(
    applicationId: number,
    body: ApiSto007RequestBody,
  ) {
    const isUpdateSucceed = this.storageRepository.updateApplication(
      applicationId,
      body,
    );

    if (!isUpdateSucceed)
      throw new HttpException(
        "Failed to update",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  async postExecutiveStorageContract(body: ApiSto008RequestBody) {
    const isCreationSucceed = await this.storageRepository.createContract(body);
    if (!isCreationSucceed) {
      throw new HttpException(
        "Failed to create application",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return isCreationSucceed;
  }

  // 계약서의 정보를 불러오는 api로, Sto009, 013에서 사용합니다.
  private async getStorageContract(id: number): Promise<ApiSto009ResponseOk> {
    const contract = await this.storageRepository.getContract(id);

    return contract;
  }

  async getStudentStorageContract(
    id: number,
    studentId: number,
  ): Promise<ApiSto009ResponseOk> {
    const contract = await this.getStorageContract(id);
    const application = await this.getStorageApplication(id);

    await this.checkIsStudentDelegate({
      studentId,
      clubId: application.clubId,
    });

    return contract;
  }

  async putStudentStorageContract(
    contractId: number,
    body: ApiSto010RequestBody,
    studentId: number,
  ) {
    const contract = await this.getStorageContract(contractId);

    if (contract.studentId !== studentId)
      throw new HttpException(
        "It seems that you're not the creator of the application.",
        HttpStatus.FORBIDDEN,
      );

    const isUpdateSucceed = this.storageRepository.updateContract(
      contractId,
      body,
    );

    if (!isUpdateSucceed)
      throw new HttpException(
        "Failed to update",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  async putExecutiveStorageContract(
    applicationId: number,
    body: ApiSto011RequestBody,
  ) {
    const isUpdateSucceed = this.storageRepository.updateContract(
      applicationId,
      body,
    );

    if (!isUpdateSucceed)
      throw new HttpException(
        "Failed to update",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  async getExecutiveStorageApplications(
    query: ApiSto012RequestQuery,
  ): Promise<ApiSto012ResponseOk> {
    const { pageOffset, itemCount } = query;
    const { paginatedItems, total } =
      await this.storageRepository.getEveryApplications(pageOffset, itemCount);

    return {
      items: paginatedItems,
      total,
      offset: pageOffset,
    };
  }

  async getExecutiveStorageContract(id: number): Promise<ApiSto013ResponseOk> {
    return this.getStorageContract(id);
  }
}
