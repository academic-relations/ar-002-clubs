import { Inject, Injectable } from "@nestjs/common";
import { ApiSto001RequestBody } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto001";
import { ApiSto008RequestBody } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto008";
import { and, eq, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { Club } from "@sparcs-clubs/api/drizzle/schema/club.schema";
import {
  StorageApplication,
  StorageContract,
  StorageNonStandard,
} from "@sparcs-clubs/api/drizzle/schema/storage.schema";
import {
  Executive,
  Student,
} from "@sparcs-clubs/api/drizzle/schema/user.schema";

@Injectable()
export class StorageRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  // 내부 util 함수, pagination을 수행합니다.
  private paginate(items, page: number, pageSize: number) {
    const startIndex = (page - 1) * pageSize;
    const total = items.length;
    const paginatedItems = items.slice(startIndex, startIndex + pageSize);
    return {
      paginatedItems,
      total,
    };
  }

  async createStorageApplication(body: ApiSto001RequestBody) {
    const result = await this.db.transaction(async tx => {
      const [applicationInsertResult] = await tx
        .insert(StorageApplication)
        .values({
          clubId: body.clubId,
          studentId: body.studentId,
          studentPhoneNumber: body.studentPhoneNumber,
          numberOfBoxes: body.numberOfBoxes,
          numberOfNonStandardItems: body.nonStandardItems
            ? body.nonStandardItems.length
            : 0,
          desiredPickUpDate: body.desiredPickUpDate,
          desiredStartDate: body.desiredStartDate,
          desiredEndDate: body.desiredEndDate,
          note: body.note,
        });

      const applicationId = applicationInsertResult.insertId;

      if (body.nonStandardItems !== undefined) {
        await Promise.all(
          body.nonStandardItems.map(async obj => {
            await tx.insert(StorageNonStandard).values({
              applicationId,
              ...obj,
            });
          }),
        );
      }
      return true;
    });
    return result;
  }

  // apiSto002
  async getStorageApplications(clubId: number, page: number, pageSize: number) {
    const applications = await this.db
      .select({
        applicationId: StorageApplication.id,
        clubNameKr: Club.name_kr,
        clubNameEn: Club.name_en,
        studentName: Student.name,
        studentPhoneNumber: StorageApplication.studentPhoneNumber,
        desiredStartDate: StorageApplication.desiredStartDate,
        desiredEndDate: StorageApplication.desiredEndDate,
        numberOfBoxes: StorageApplication.numberOfBoxes,
        numberOfNonStandardItems: StorageApplication.numberOfNonStandardItems,
        status: StorageApplication.status,
        createdAt: StorageApplication.createdAt,
      })
      .from(StorageApplication)
      .where(eq(StorageApplication.clubId, clubId))
      .leftJoin(Student, eq(StorageApplication.studentId, Student.id))
      .leftJoin(Club, eq(StorageApplication.clubId, Club.id))
      .groupBy(StorageApplication.id);

    return this.paginate(applications, page, pageSize);
  }

  // async getMyApplications(studentId: number, page: number, pageSize: number) {
  //   const applications = await this.db
  //     .select({
  //       clubId: StorageApplicaiton.clubId,
  //       desiredStartDate: StorageApplicaiton.desiredStartDate,
  //       desiredEndDate: StorageApplicaiton.desiredEndDate,
  //       numberOfBoxes: StorageApplicaiton.numberOfBoxes,
  //       numberOfNonStandardItems: StorageApplicaiton.numberOfNonStandardItems,
  //       status: StorageApplicaiton.status,
  //       createdAt: StorageApplicaiton.createdAt,
  //     })
  //     .from(StorageApplicaiton)
  //     .where(eq(StorageApplicaiton.studentId, studentId))
  //     .groupBy(StorageApplicaiton.id);

  //   return this.paginate(applications, page, pageSize);
  // }

  // apiSto012
  async getEveryStorageApplications(page: number, pageSize: number) {
    const applications = await this.db
      .select({
        applicationId: StorageApplication.id,
        clubNameKr: Club.name_kr,
        clubNameEn: Club.name_en,
        studentName: Student.name,
        studentPhoneNumber: StorageApplication.studentPhoneNumber,
        desiredStartDate: StorageApplication.desiredStartDate,
        desiredEndDate: StorageApplication.desiredEndDate,
        numberOfBoxes: StorageApplication.numberOfBoxes,
        numberOfNonStandardItems: StorageApplication.numberOfNonStandardItems,
        status: StorageApplication.status,
        createdAt: StorageApplication.createdAt,
      })
      .from(StorageApplication)
      .leftJoin(Student, eq(StorageApplication.studentId, Student.id))
      .leftJoin(Club, eq(StorageApplication.clubId, Club.id))
      .groupBy(StorageApplication.id);

    return this.paginate(applications, page, pageSize);
  }

  // apiSto004, 005, 009
  async getStorageApplication(id: number) {
    const application = await this.db
      .select({
        clubId: StorageApplication.clubId,
        studentId: StorageApplication.studentId,
        clubNameKr: Club.name_kr,
        clubNameEn: Club.name_en,
        studentName: Student.name,
        studentPhoneNumber: StorageApplication.studentPhoneNumber,
        numberOfBoxes: StorageApplication.numberOfBoxes,
        desiredPickUpDate: StorageApplication.desiredPickUpDate,
        desiredStartDate: StorageApplication.desiredStartDate,
        desiredEndDate: StorageApplication.desiredEndDate,
        status: StorageApplication.status,
        isPickedUp: StorageApplication.isPickedUp,
        contractId: StorageApplication.contractId,
        note: StorageApplication.note,
        createdAt: StorageApplication.createdAt,
      })
      .from(StorageApplication)
      .leftJoin(Student, eq(StorageApplication.studentId, Student.id))
      .leftJoin(Club, eq(StorageApplication.clubId, Club.id))
      .where(eq(StorageApplication.id, id))
      .limit(1);

    return application[0];
  }

  async getStorageNonStandardItems(applicationId: number) {
    const nonStandardItems = await this.db
      .select({
        name: StorageNonStandard.name,
        fileId: StorageNonStandard.fileId,
      })
      .from(StorageNonStandard)
      .where(eq(StorageNonStandard.applicationId, applicationId));

    return nonStandardItems;
  }

  async updateStorageApplication(
    applicationId: number,
    body: {
      numberOfBoxes?: number;
      desiredPickUpDate?: Date;
      nonStandardItems?: {
        name: string;
        fileId: string;
      }[];
      desiredStartDate?: Date;
      desiredEndDate?: Date;
      status?: string;
      isPickedUp?: boolean;
      note?: string;
    },
  ) {
    const isUpdateSucceed = await this.db.transaction(async tx => {
      const deletedAt = new Date();

      const [storageApplicationSetResult] = await tx
        .update(StorageApplication)
        .set({
          numberOfBoxes: body.numberOfBoxes,
          desiredPickUpDate: body.desiredPickUpDate,
          numberOfNonStandardItems: body.nonStandardItems
            ? body.nonStandardItems.length
            : 0,
          desiredStartDate: body.desiredStartDate,
          desiredEndDate: body.desiredEndDate,
          status: body.status,
          isPickedUp: body.isPickedUp,
          note: body.note,
        })
        .where(eq(StorageApplication.id, applicationId));
      if (storageApplicationSetResult.affectedRows !== 1) {
        logger.debug("[updateActivity] rollback occurs");
        tx.rollback();
        return false;
      }

      // 종속된 NonStandardItem 전체 삭제
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [nonStandardItemDeletionResult] = await tx
        .update(StorageNonStandard)
        .set({
          deletedAt,
        })
        .where(
          and(
            eq(StorageNonStandard.applicationId, applicationId),
            isNull(StorageNonStandard.deletedAt),
          ),
        );

      // NonStandardItem 재생성
      if (body.nonStandardItems !== undefined) {
        await Promise.all(
          body.nonStandardItems.map(async obj => {
            await tx.insert(StorageNonStandard).values({
              applicationId,
              ...obj,
            });
          }),
        );
      }

      return true;
    });
    return isUpdateSucceed;
  }

  async createStorageContract(body: ApiSto008RequestBody) {
    const result = await this.db.transaction(async tx => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [contractInsertResult] = await tx.insert(StorageContract).values({
        numberOfBoxes: body.numberOfBoxes,
        numberOfNonStandardItems: body.numberOfNonStandardItems,
        charge: body.charge,
        zone: body.zone,
        studentId: body.studentId,
        executiveId: body.executiveId,
        applicationId: body.applicationId,
      });
      return true;
    });
    return result;
  }

  async getStorageContract(id: number) {
    const application = await this.db
      .select({
        clubNameKr: Club.name_kr,
        clubNameEn: Club.name_en,
        studentName: Student.name,
        studentId: Student.id,
        executiveName: Executive.name,
        startDate: StorageContract.createdAt,
        endDate: StorageContract.endDate,
        numberOfBoxes: StorageContract.numberOfBoxes,
        numberOfNonStandardItems: StorageContract.numberOfNonStandardItems,
        charge: StorageContract.charge,
        zone: StorageContract.zone,
        applicationId: StorageContract.applicationId,
        note: StorageContract.note,
      })
      .from(StorageContract)
      .leftJoin(Student, eq(StorageContract.studentId, Student.id))
      .leftJoin(
        StorageApplication,
        eq(StorageContract.applicationId, StorageApplication.id),
      )
      .leftJoin(Club, eq(StorageApplication.clubId, Club.id))
      .leftJoin(Executive, eq(StorageContract.executiveId, Executive.id))
      .where(eq(StorageContract.id, id))
      .limit(1);

    return application[0];
  }

  async updateStorageContract(
    contractId: number,
    body: {
      status: string;
      note?: string;
    },
  ) {
    const contract = await this.getStorageContract(contractId);

    const isUpdateSucceed = await this.db.transaction(async tx => {
      const [storageApplicationSetResult] = await tx
        .update(StorageApplication)
        .set({
          status: body.status,
        })
        .where(eq(StorageApplication.id, contract.applicationId));
      if (storageApplicationSetResult.affectedRows !== 1) {
        logger.debug("[updateStorageContract] rollback occurs");
        tx.rollback();
        return false;
      }

      const [storageContractSetResult] = await tx
        .update(StorageContract)
        .set({
          note: body.note,
        })
        .where(eq(StorageContract.id, contractId));
      if (storageContractSetResult.affectedRows !== 1) {
        logger.debug("[updateStorageContract] rollback occurs");
        tx.rollback();
        return false;
      }

      return true;
    });
    return isUpdateSucceed;
  }
}
