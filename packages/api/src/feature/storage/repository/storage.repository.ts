/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from "@nestjs/common";
import { ApiSto001RequestBody } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto001";
import { and, count, eq, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import {
  StorageApplicaiton,
  StorageBox,
  StorageContract,
  StorageNonStandard,
} from "@sparcs-clubs/api/drizzle/schema/storage.schema";

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

  async createApplication(body: ApiSto001RequestBody) {
    const result = await this.db.transaction(async tx => {
      const [applicationInsertResult] = await tx
        .insert(StorageApplicaiton)
        .values({
          clubId: body.clubId,
          studentId: body.studentId,
          studentPhoneNumber: body.studentPhoneNumber,
          numberOfBoxes: body.numberOfBoxes,
          numberOfNonStandardItems: body.nonStandardItems.length,
          desiredPickUpDate: body.desiredPickUpDate,
          desiredStartDate: body.desiredStartDate,
          desiredEndDate: body.desiredEndDate,
          note: body.note,
        });

      const applicationId = applicationInsertResult.insertId;

      await Promise.all(
        body.nonStandardItems.map(async obj => {
          await tx.insert(StorageNonStandard).values({
            applicationId,
            ...obj,
          });
        }),
      );
      return true;
    });
    return result;
  }

  async getApplications(clubId: number, page: number, pageSize: number) {
    const applications = await this.db
      .select({
        clubId: StorageApplicaiton.clubId,
        studentId: StorageApplicaiton.studentId,
        studentPhoneNumber: StorageApplicaiton.studentPhoneNumber,
        desiredStartDate: StorageApplicaiton.desiredStartDate,
        desiredEndDate: StorageApplicaiton.desiredEndDate,
        numberOfBoxes: StorageApplicaiton.numberOfBoxes,
        numberOfNonStandardItems: StorageApplicaiton.numberOfNonStandardItems,
        status: StorageApplicaiton.status,
        createdAt: StorageApplicaiton.createdAt,
      })
      .from(StorageApplicaiton)
      .where(eq(StorageApplicaiton.clubId, clubId))
      .groupBy(StorageApplicaiton.id);

    return this.paginate(applications, page, pageSize);
  }

  async getMyApplications(studentId: number, page: number, pageSize: number) {
    const applications = await this.db
      .select({
        clubId: StorageApplicaiton.clubId,
        desiredStartDate: StorageApplicaiton.desiredStartDate,
        desiredEndDate: StorageApplicaiton.desiredEndDate,
        numberOfBoxes: StorageApplicaiton.numberOfBoxes,
        numberOfNonStandardItems: StorageApplicaiton.numberOfNonStandardItems,
        status: StorageApplicaiton.status,
        createdAt: StorageApplicaiton.createdAt,
      })
      .from(StorageApplicaiton)
      .where(eq(StorageApplicaiton.studentId, studentId))
      .groupBy(StorageApplicaiton.id);

    return this.paginate(applications, page, pageSize);
  }

  async getEveryApplications(page: number, pageSize: number) {
    const applications = await this.db
      .select({
        clubId: StorageApplicaiton.clubId,
        studentId: StorageApplicaiton.studentId,
        studentPhoneNumber: StorageApplicaiton.studentPhoneNumber,
        desiredStartDate: StorageApplicaiton.desiredStartDate,
        desiredEndDate: StorageApplicaiton.desiredEndDate,
        numberOfBoxes: StorageApplicaiton.numberOfBoxes,
        numberOfNonStandardItems: StorageApplicaiton.numberOfNonStandardItems,
        status: StorageApplicaiton.status,
        createdAt: StorageApplicaiton.createdAt,
      })
      .from(StorageApplicaiton)
      .groupBy(StorageApplicaiton.id);

    return this.paginate(applications, page, pageSize);
  }

  async getApplication(id: number) {
    const application = await this.db
      .select({
        clubId: StorageApplicaiton.clubId,
        studentId: StorageApplicaiton.studentId,
        studentPhoneNumber: StorageApplicaiton.studentPhoneNumber,
        numberOfBoxes: StorageApplicaiton.numberOfBoxes,
        desiredPickUpDate: StorageApplicaiton.desiredPickUpDate,
        desiredStartDate: StorageApplicaiton.desiredStartDate,
        desiredEndDate: StorageApplicaiton.desiredEndDate,
        status: StorageApplicaiton.status,
        isPickedUp: StorageApplicaiton.isPickedUp,
        contractId: StorageApplicaiton.contractId,
        note: StorageApplicaiton.note,
        createdAt: StorageApplicaiton.createdAt,
      })
      .from(StorageApplicaiton)
      .where(eq(StorageApplicaiton.id, id))
      .limit(1);

    return application[0];
  }

  async getNonStandardItems(applicationId: number) {
    const nonStandardItems = await this.db
      .select({
        name: StorageNonStandard.name,
        fileId: StorageNonStandard.fileId,
      })
      .from(StorageNonStandard)
      .where(eq(StorageNonStandard.applicationId, applicationId));

    return nonStandardItems;
  }

  async updateApplication(
    applicationId: number,
    body: {
      numberOfBoxes?: number;
      desiredPickUpDate?: Date;
      nonStandardItems?: {
        name: string;
        fileId: number;
      }[];
      desiredStartDate?: Date;
      desiredEndDate?: Date;
      status: string;
      isPickedUp?: boolean;
      note: string;
    },
  ) {
    const isUpdateSucceed = await this.db.transaction(async tx => {
      const deletedAt = new Date();

      const [storageApplicationSetResult] = await tx
        .update(StorageApplicaiton)
        .set({
          numberOfBoxes: body.numberOfBoxes,
          desiredPickUpDate: body.desiredPickUpDate,
          numberOfNonStandardItems: body.nonStandardItems.length,
          desiredStartDate: body.desiredStartDate,
          desiredEndDate: body.desiredEndDate,
          status: body.status,
          isPickedUp: body.isPickedUp,
          note: body.note,
        })
        .where(eq(StorageApplicaiton.id, applicationId));
      if (storageApplicationSetResult.affectedRows !== 1) {
        logger.debug("[updateActivity] rollback occurs");
        tx.rollback();
        return false;
      }

      // 종속된 NonStandardItem 전체 삭제
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
      await Promise.all(
        body.nonStandardItems.map(async obj => {
          await tx.insert(StorageNonStandard).values({
            applicationId,
            ...obj,
          });
        }),
      );

      return true;
    });
    return isUpdateSucceed;
  }
}
