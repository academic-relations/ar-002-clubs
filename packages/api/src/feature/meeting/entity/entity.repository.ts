import {
  // HttpException, HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";

import { and, eq, max, sql } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
// import { getKSTDate } from "@sparcs-clubs/api/common/util/util";

import {
  MeetingAgendaContent,
  MeetingMapping,
} from "@sparcs-clubs/api/drizzle/schema/meeting.schema";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

@Injectable()
export class EntityRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async postMeetingAgendaContent(
    userId: number,
    meetingId: number,
    agendaId: number,
    content: string,
  ) {
    const isPostContentSuccess = await this.db.transaction(async tx => {
      const [insertContentResult] = await tx
        .insert(MeetingAgendaContent)
        .values({
          content,
        });

      if (insertContentResult.affectedRows !== 1) {
        logger.debug(
          "[EntityRepository] Failed to insert meeting agenda content",
        );
        tx.rollback();
        return false;
      }

      const contentId = insertContentResult.insertId;
      logger.debug(
        `[EntityRepository] Inserted meeting agenda content: ${contentId}`,
      );

      const getPositions = await tx
        .select({
          maxEntityPosition: max(MeetingMapping.meetingAgendaEntityPosition),
          agendaPosition: MeetingMapping.meetingAgendaPosition,
        })
        .from(MeetingMapping)
        .where(
          and(
            eq(MeetingMapping.meetingId, meetingId),
            eq(MeetingMapping.meetingAgendaId, agendaId),
          ),
        );

      const maxAgendaEntityPosition = getPositions[0]?.maxEntityPosition ?? 0;
      const agendaPosition = getPositions[0]?.agendaPosition ?? 0;

      const [insertMappingResult] = await tx.insert(MeetingMapping).values({
        meetingId,
        meetingAgendaId: agendaId,
        meetingAgendaPosition: agendaPosition,
        meetingAgendaEntityType: 1, // TODO: content enum으로 교체
        meetingAgendaContentId: contentId,
        meetingAgendaEntityPosition: maxAgendaEntityPosition + 1,
      });

      if (insertMappingResult.affectedRows !== 1) {
        logger.debug(
          "[EntityRepository] Failed to insert meeting agenda content mapping",
        );
        tx.rollback();
        return false;
      }

      const meetingMappingId = insertMappingResult.insertId;
      logger.debug(
        `[EntityRepository] Inserted meeting agenda content mapping: ${meetingMappingId}`,
      );

      return true;
    });

    return isPostContentSuccess;
  }

  async patchMeetingAgendaContent(
    userId: number,
    meetingId: number,
    agendaId: number,
    contentId: number,
    content: string,
  ) {
    const isUpdateContentSuccess = await this.db.transaction(async tx => {
      const checkDeleted = await tx
        .select({ isDeleted: MeetingAgendaContent.deletedAt })
        .from(MeetingAgendaContent)
        .where(eq(MeetingAgendaContent.id, contentId));

      if (checkDeleted.length === 0) {
        logger.debug("[EntitygRepository] No such content exists."); // CHACHA: ContentId가 유효한지
        return false;
      }

      if (checkDeleted[0]?.isDeleted) {
        logger.debug("[EntityRepository] This content is deleted."); // CHACHA: Update 시에 deletedAt을 검사
        return false;
      }

      const [result] = await tx
        .update(MeetingAgendaContent)
        .set({
          content,
          updatedAt: sql<Date>`NOW()`,
        })
        .where(eq(MeetingAgendaContent.id, contentId));

      if (result.affectedRows !== 1) {
        logger.debug(
          "[EntityRepository] Failed to update meeting agenda content.",
        );
        return false;
      }

      return result;
    });

    logger.debug(
      `[EntityRepository] Updated meeting agenda content: ${contentId}`,
    );
    return isUpdateContentSuccess;
  }

  async deleteMeetingAgendaContent(
    userId: number,
    meetingId: number,
    agendaId: number,
    contentId: number,
  ) {
    const isDeleteContentSuccess = await this.db.transaction(async tx => {
      const [deleteFromContentResult] = await tx
        .update(MeetingAgendaContent)
        .set({ deletedAt: sql<Date>`Now()` })
        .where(eq(MeetingAgendaContent.id, contentId));

      if (deleteFromContentResult.affectedRows !== 1) {
        logger.debug(
          "[EntityRepository] Failed to soft delete meeting agenda content.",
        );
        return false;
      }

      const [deleteFromMappingResult] = await tx
        .update(MeetingMapping)
        .set({ deletedAt: sql<Date>`NOW()` })
        .where(
          and(
            eq(MeetingMapping.meetingId, meetingId),
            eq(MeetingMapping.meetingAgendaId, agendaId),
            eq(MeetingMapping.meetingAgendaContentId, contentId),
          ),
        );

      if (deleteFromMappingResult.affectedRows !== 1) {
        logger.debug(
          "[EntityRepository] Failed to soft delete meeting agenda content mapping.",
        );
        return false;
      }

      logger.debug(
        `[EntityRepository] Soft deleted meeting agenda content mapping: ${meetingId}, ${agendaId}, ${contentId}`,
      );

      return deleteFromMappingResult;
    });

    return isDeleteContentSuccess;
  }
}
