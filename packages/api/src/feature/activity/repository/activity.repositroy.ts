import { Inject, Injectable } from "@nestjs/common";
import {
  ActivityStatusEnum,
  ActivityTypeEnum,
} from "@sparcs-clubs/interface/common/enum/activity.enum";
import { and, eq, gt, isNull, lte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import {
  Activity,
  ActivityDeadlineD,
  ActivityEvidenceFile,
  ActivityParticipant,
  ProfessorSignStatus,
} from "@sparcs-clubs/api/drizzle/schema/activity.schema";

@Injectable()
export default class ActivityRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  // 새로운 활동을 DB에 작성합니다.
  // 작성에 성공하면 True, 실패하면 False를 리턴합니다.
  async insertActivity(contents: {
    clubId: number;
    name: string;
    activityTypeEnumId: ActivityTypeEnum;
    semesterId: number;
    startTerm: Date;
    endTerm: Date;
    location: string;
    purpose: string;
    detail: string;
    evidence: string;
    evidenceFileIds: Array<string>;
    participantIds: Array<number>;
  }): Promise<boolean> {
    const isInsertionSucceed = await this.db.transaction(async tx => {
      const [activityInsertResult] = await tx.insert(Activity).values({
        clubId: contents.clubId,
        name: contents.name,
        activityStatusEnumId: Number(contents.activityTypeEnumId),
        semesterId: contents.semesterId,
        startTerm: contents.startTerm,
        endTerm: contents.endTerm,
        location: contents.location,
        purpose: contents.location,
        detail: contents.detail,
        evidence: contents.evidence,
        activityTypeEnumId: Number(ActivityStatusEnum.Applied),
      });
      if (activityInsertResult.affectedRows !== 1) {
        logger.debug("[insertActivity] rollback occurs");
        tx.rollback();
        return false;
      }

      logger.debug(
        `[insertActivity] New activity inserted with id ${activityInsertResult.insertId}`,
      );

      await Promise.all(
        contents.participantIds.map(async studentId => {
          const [fileInsertResult] = await tx
            .insert(ActivityParticipant)
            .values({
              activityId: activityInsertResult.insertId,
              studentId,
            });

          if (fileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertActivity] student insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      await Promise.all(
        contents.evidenceFileIds.map(async fileId => {
          const [fileInsertResult] = await tx
            .insert(ActivityEvidenceFile)
            .values({
              activityId: activityInsertResult.insertId,
              fileId,
            });

          if (fileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertActivity] FileId insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      const [signInsertResult] = await tx
        .insert(ProfessorSignStatus)
        .values({ clubId: contents.clubId, semesterId: contents.semesterId });
      if (signInsertResult.affectedRows !== 1) {
        logger.debug("[insertActivity] FileId insert failed. Rollback occurs");
        tx.rollback();
        return false;
      }

      return true;
    });

    return isInsertionSucceed;
  }

  async selectActivityByClubIdAndSemesterId(
    clubId: number,
    semesterId: number,
  ) {
    const result = await this.db
      .select()
      .from(Activity)
      .where(
        and(
          eq(Activity.clubId, clubId),
          eq(Activity.semesterId, semesterId),
          isNull(Activity.deletedAt),
        ),
      );
    return result;
  }

  async selectDeadlineByDate(date: Date) {
    const result = await this.db
      .select()
      .from(ActivityDeadlineD)
      .where(
        and(
          lte(ActivityDeadlineD.startDate, date),
          gt(ActivityDeadlineD.endDate, date),
          isNull(ActivityDeadlineD.deletedAt),
        ),
      );
    return result;
  }
}
