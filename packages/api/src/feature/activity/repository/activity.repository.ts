import { Inject, Injectable } from "@nestjs/common";
import {
  ActivityStatusEnum,
  ActivityTypeEnum,
} from "@sparcs-clubs/interface/common/enum/activity.enum";
import { and, asc, eq, gt, isNull, lte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import {
  Activity,
  ActivityDeadlineD,
  ActivityEvidenceFile,
  ActivityFeedback,
  ActivityParticipant,
  ActivityT,
  ProfessorSignStatus,
} from "@sparcs-clubs/api/drizzle/schema/activity.schema";
import { Student } from "@sparcs-clubs/api/drizzle/schema/user.schema";

@Injectable()
export default class ActivityRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  // 활동을 DB에서 soft delete 합니다.
  // 작성에 성공하면 True, 실패하면 False를 리턴합니다.
  async deleteActivity(contents: { activityId: number }): Promise<boolean> {
    const isDeletionSucceed = await this.db.transaction(async tx => {
      const deletedAt = new Date();
      const [activitySetResult] = await tx
        .update(Activity)
        .set({
          deletedAt,
        })
        .where(
          and(eq(Activity.id, contents.activityId), isNull(Activity.deletedAt)),
        );

      if (activitySetResult.affectedRows !== 1) {
        logger.debug(
          "[deleteActivity] activity deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }

      const [participantSetResult] = await tx
        .update(ActivityParticipant)
        .set({
          deletedAt,
        })
        .where(
          and(
            eq(ActivityParticipant.activityId, contents.activityId),
            isNull(ActivityParticipant.deletedAt),
          ),
        );
      if (participantSetResult.affectedRows < 1) {
        logger.debug(
          "[deleteActivity] student deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }

      const [durationSetResult] = await tx
        .update(ActivityT)
        .set({
          deletedAt,
        })
        .where(
          and(
            eq(ActivityT.activityId, contents.activityId),
            isNull(ActivityT.deletedAt),
          ),
        );
      if (durationSetResult.affectedRows < 1) {
        logger.debug(
          "[deleteActivity] duration deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }

      const [fileSetResult] = await tx
        .update(ActivityEvidenceFile)
        .set({
          deletedAt,
        })
        .where(
          and(
            eq(ActivityEvidenceFile.activityId, contents.activityId),
            isNull(ActivityEvidenceFile.deletedAt),
          ),
        );
      if (fileSetResult.affectedRows < 1) {
        logger.debug("[deleteActivity] file deletion failed. Rollback occurs");
        tx.rollback();
        return false;
      }

      await tx
        .update(ActivityFeedback)
        .set({
          deletedAt,
        })
        .where(
          and(
            eq(ActivityFeedback.activityId, contents.activityId),
            isNull(ActivityFeedback.deletedAt),
          ),
        );
      // feedback은 아직 없을수도 있어서 롤백이 없어요

      return true;
    });

    return isDeletionSucceed;
  }

  // 새로운 활동을 DB에 작성합니다.
  // 작성에 성공하면 True, 실패하면 False를 리턴합니다.
  async insertActivity(contents: {
    clubId: number;
    name: string;
    activityTypeEnumId: ActivityTypeEnum;
    duration: Array<{
      startTerm: Date;
      endTerm: Date;
    }>;
    location: string;
    purpose: string;
    detail: string;
    evidence: string;
    evidenceFileIds: Array<string>;
    participantIds: Array<number>;
    activityDId: number;
  }): Promise<boolean> {
    const isInsertionSucceed = await this.db.transaction(async tx => {
      const [activityInsertResult] = await tx.insert(Activity).values({
        clubId: contents.clubId,
        originalName: contents.name,
        name: contents.name,
        activityStatusEnumId: Number(contents.activityTypeEnumId),
        location: contents.location,
        purpose: contents.location,
        detail: contents.detail,
        evidence: contents.evidence,
        activityDId: contents.activityDId,
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
          const [studentInsertResult] = await tx
            .insert(ActivityParticipant)
            .values({
              activityId: activityInsertResult.insertId,
              studentId,
            });

          if (studentInsertResult.affectedRows !== 1) {
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
        contents.duration.map(async ({ startTerm, endTerm }) => {
          const [durationInsertResult] = await tx.insert(ActivityT).values({
            activityId: activityInsertResult.insertId,
            startTerm,
            endTerm,
          });

          if (durationInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertActivity] duration insert failed. Rollback occurs",
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
        // TODO: 교수님 사인도 activityD로 맞추기
        .values({ clubId: contents.clubId, semesterId: contents.activityDId });
      if (signInsertResult.affectedRows !== 1) {
        logger.debug("[insertActivity] FileId insert failed. Rollback occurs");
        tx.rollback();
        return false;
      }

      return true;
    });

    return isInsertionSucceed;
  }

  async selectActivityByActivityId(activityId: number) {
    const result = await this.db
      .select()
      .from(Activity)
      .where(and(eq(Activity.id, activityId), isNull(Activity.deletedAt)));
    return result;
  }

  /**
   * @param clubId 동아리 ID
   * @description 가동아리 활보 작성은 하나의 기간만 존재하기에
   * clubId기준으로 한번에 가져오기 위한 쿼리입니다.
   * @returns 해당 동아리가 적은 삭제되지 않은 모든 활동을 가져옵니다.
   */
  async selectActivityByClubId(param: { clubId: number }) {
    const result = await this.db
      .select()
      .from(Activity)
      .where(
        and(eq(Activity.clubId, param.clubId), isNull(Activity.deletedAt)),
      );
    return result;
  }

  async selectActivityByClubIdAndActivityDId(
    clubId: number,
    activityDId: number,
  ) {
    const result = await this.db
      .select()
      .from(Activity)
      .where(
        and(
          eq(Activity.clubId, clubId),
          eq(Activity.activityDId, activityDId),
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

  async selectFileByActivityId(activityId: number) {
    const result = await this.db
      .select()
      .from(ActivityEvidenceFile)
      .where(
        and(
          eq(ActivityEvidenceFile.activityId, activityId),
          isNull(ActivityEvidenceFile.deletedAt),
        ),
      );
    return result;
  }

  async selectDurationByActivityId(activityId: number) {
    const result = await this.db
      .select()
      .from(ActivityT)
      .where(
        and(eq(ActivityT.activityId, activityId), isNull(ActivityT.deletedAt)),
      )
      .orderBy(asc(ActivityT.startTerm), asc(ActivityT.endTerm));

    return result;
  }

  async selectParticipantByActivityId(activityId: number) {
    const result = await this.db
      .select({
        studentId: ActivityParticipant.studentId,
        studentNumber: Student.number,
        name: Student.name,
      })
      .from(ActivityParticipant)
      .leftJoin(Student, eq(ActivityParticipant.studentId, Student.id))
      .where(
        and(
          eq(ActivityParticipant.activityId, activityId),
          isNull(ActivityParticipant.deletedAt),
        ),
      );

    return result;
  }

  async updateActivity(param: {
    activityId: number;
    name: string;
    activityTypeEnumId: ActivityTypeEnum;
    duration: Array<{
      startTerm: Date;
      endTerm: Date;
    }>;
    location: string;
    purpose: string;
    detail: string;
    evidence: string;
    evidenceFileIds: Array<string>;
    participantIds: Array<number>;
    activityDId: number;
  }) {
    const isUpdateSucceed = await this.db.transaction(async tx => {
      const deletedAt = new Date();

      const [activitySetResult] = await tx
        .update(Activity)
        .set({
          name: param.name,
          activityStatusEnumId: Number(param.activityTypeEnumId),
          location: param.location,
          purpose: param.purpose,
          detail: param.detail,
          evidence: param.evidence,
          activityDId: param.activityDId,
        })
        .where(eq(Activity.id, param.activityId));
      if (activitySetResult.affectedRows !== 1) {
        logger.debug("[updateActivity] rollback occurs");
        tx.rollback();
        return false;
      }

      // 참가자 전체 삭제 및 재생성
      const [participantDeletionResult] = await tx
        .update(ActivityParticipant)
        .set({
          deletedAt,
        })
        .where(
          and(
            eq(ActivityParticipant.activityId, param.activityId),
            isNull(ActivityParticipant.deletedAt),
          ),
        );
      if (participantDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteActivity] student deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        param.participantIds.map(async studentId => {
          const [studentSetResult] = await tx
            .insert(ActivityParticipant)
            .values({
              activityId: param.activityId,
              studentId,
            });

          if (studentSetResult.affectedRows !== 1) {
            logger.debug(
              "[updateActivity] student insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      // 기간 전체 삭제 및 재생성
      const [durationDeletionResult] = await tx
        .update(ActivityT)
        .set({
          deletedAt,
        })
        .where(
          and(
            eq(ActivityT.activityId, param.activityId),
            isNull(ActivityT.deletedAt),
          ),
        );
      if (durationDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteActivity] duration deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        param.duration.map(async ({ startTerm, endTerm }) => {
          const [durationInsertResult] = await tx.insert(ActivityT).values({
            activityId: param.activityId,
            startTerm,
            endTerm,
          });

          if (durationInsertResult.affectedRows < 1) {
            logger.debug(
              "[updateActivity] duration insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      // 근거 자료 전체 삭제 및 재생성
      const [fileDeletionResult] = await tx
        .update(ActivityEvidenceFile)
        .set({
          deletedAt,
        })
        .where(
          and(
            eq(ActivityEvidenceFile.activityId, param.activityId),
            isNull(ActivityEvidenceFile.deletedAt),
          ),
        );
      if (fileDeletionResult.affectedRows < 1) {
        logger.debug("[deleteActivity] file deletion failed. Rollback occurs");
        tx.rollback();
        return false;
      }
      await Promise.all(
        param.evidenceFileIds.map(async fileId => {
          const [fileInsertResult] = await tx
            .insert(ActivityEvidenceFile)
            .values({
              activityId: param.activityId,
              fileId,
            });

          if (fileInsertResult.affectedRows < 1) {
            logger.debug(
              "[updateActivity] FileId insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      return true;
    });

    return isUpdateSucceed;
  }

  async selectActivityNameById(id: number) {
    const result = await this.db
      .select({ name: Activity.name })
      .from(Activity)
      .where(eq(Activity.id, id));
    return result;
  }
}
