import {
  // HttpException, HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";

import { and, eq, max } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
// import { getKSTDate } from "@sparcs-clubs/api/common/util/util";

import { MeetingMapping } from "@sparcs-clubs/api/drizzle/schema/meeting.schema";
import { MeetingAgendaContent } from "dist/drizzle/schema/meeting.schema";

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
        `[EntityRepository] Failed to insert meeting agenda content mapping: ${meetingMappingId}`,
      );

      return true;
    });

    return isPostContentSuccess;
  }
}
