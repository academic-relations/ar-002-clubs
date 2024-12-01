import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";

import {
  ApiMee012RequestQuery,
  ApiMee012ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee012";
import { and, count, eq, gte, isNull, lt, max, not, sql } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
import { getKSTDate } from "@sparcs-clubs/api/common/util/util";
import {
  Meeting,
  MeetingAgenda,
  MeetingAnnouncement,
  MeetingAttendanceTimeT,
  MeetingMapping,
  MeetingVoteResult,
} from "@sparcs-clubs/api/drizzle/schema/meeting.schema";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

@Injectable()
export class MeetingRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async entryMeeting(userId: number, meetingId: number) {
    const startTerm = new Date();
    const result = await this.db.insert(MeetingAttendanceTimeT).values({
      userId,
      meetingId,
      startTerm,
    });
    return result;
  }

  async exitMeeting(userId: number, meetingId: number) {
    const endTerm = new Date();
    const result = await this.db
      .update(MeetingAttendanceTimeT)
      .set({
        endTerm,
      })
      .where(
        and(
          eq(MeetingAttendanceTimeT.userId, userId),
          eq(MeetingAttendanceTimeT.meetingId, meetingId),
        ),
      );

    return result;
  }

  async vote(choiceId: number, userId: number, voteId: number) {
    const result = await this.db.insert(MeetingVoteResult).values({
      voteId,
      choiceId,
      userId,
    });

    return result;
  }

  async postExecutiveMeetingAnnouncement(contents: {
    meetingEnumId: number;
    announcementTitle: string;
    announcementContent: string;
    startDate: Date;
    endDate?: Date;
    isRegular: boolean;
    location?: string;
    locationEn?: string;
  }): Promise<number | undefined> {
    // TODO: string인 필수 field validation
    const insertedAnnouncementId = await this.db.transaction(async tx => {
      const [announcementInsertResult] = await tx
        .insert(MeetingAnnouncement)
        .values({
          announcementTitle: contents.announcementTitle,
          announcementContent: contents.announcementContent,
        });

      if (announcementInsertResult.affectedRows !== 1) {
        logger.debug("[MeetingRepository] Failed to insert announcement");
        tx.rollback();
        return undefined;
      }

      const announcementId = announcementInsertResult.insertId;
      logger.debug(
        `[MeetingRepository] Inserted announcement: ${announcementId}`,
      );

      // meetingTag는 같이 묶이는 분과회의를 위한 것으로, 행 생성시 backend에서 임의의 값을 할당하여야합니다.
      // TODO : 이 부분의 태그를 어떻게 설정할 것인지에 대한 작업이 필요합니다.
      const meetingTag = "tag";

      const [meetingInsertResult] = await tx.insert(Meeting).values({
        announcementId,
        meetingEnumId: contents.meetingEnumId,
        startDate: contents.startDate,
        endDate: contents.endDate,
        isRegular: contents.isRegular,
        location: contents.location,
        locationEn: contents.locationEn,
        tag: meetingTag,
      });
      if (meetingInsertResult.affectedRows !== 1) {
        logger.debug("[MeetingRepository] Failed to insert meeting");
        tx.rollback();
        return undefined;
      }
      logger.debug(
        `[MeetingRepository] Inserted meeting: ${meetingInsertResult.insertId}`,
      );

      return announcementId;
    });
    return insertedAnnouncementId;
  }

  async selectMeetingAnnouncementById(announcementId: number) {
    const result = await this.db
      .select({
        announcementTitle: MeetingAnnouncement.announcementTitle,
        announcementContent: MeetingAnnouncement.announcementContent,
      })
      .from(MeetingAnnouncement)
      .where(
        and(
          eq(MeetingAnnouncement.id, announcementId),
          isNull(MeetingAnnouncement.deletedAt),
        ),
      )
      .execute();

    if (result.length !== 1) {
      logger.debug(
        `[MeetingRepository] Failed to select announcement: ${announcementId}`,
      );
      throw new HttpException("No such meeting", HttpStatus.BAD_REQUEST);
    }
    return result[0];
  }

  async selectMeetingById(announcementId: number) {
    const result = await this.db
      .select({
        meetingEnumId: Meeting.meetingEnumId,
        startDate: Meeting.startDate,
        endDate: Meeting.endDate,
        isRegular: Meeting.isRegular,
        location: Meeting.location,
        locationEn: Meeting.locationEn,
        tag: Meeting.tag,
      })
      .from(Meeting)
      .where(eq(Meeting.announcementId, announcementId))
      .execute();

    if (result.length !== 1) {
      logger.debug(
        `[MeetingRepository] Failed to select meeting: ${announcementId}`,
      );
      return null;
    }
    return result[0];
  }

  async updateExecutiveMeetingAnnouncement(
    param: { announcementId: number },
    body: {
      meetingEnumId?: number;
      announcementTitle?: string;
      announcementContent?: string;
      startDate?: Date;
      endDate?: Date;
      isRegular?: boolean;
      location?: string;
      locationEn?: string;
      tag?: string;
    },
  ) {
    const isUpdateSucceed = await this.db.transaction(async tx => {
      const announcementUpdates: {
        announcementTitle?: string;
        announcementContent?: string;
      } = {};
      if (body.announcementTitle !== undefined) {
        announcementUpdates.announcementTitle = body.announcementTitle;
      }
      if (body.announcementContent !== undefined) {
        announcementUpdates.announcementContent = body.announcementContent;
      }

      if (Object.keys(announcementUpdates).length > 0) {
        const [announcementUpdateResult] = await tx
          .update(MeetingAnnouncement)
          .set(announcementUpdates)
          .where(eq(MeetingAnnouncement.id, param.announcementId));

        if (announcementUpdateResult.affectedRows !== 1) {
          logger.debug("[MeetingRepository] Failed to update announcement");
          tx.rollback();
          return false;
        }
        logger.debug(
          `[MeetingRepository] Updated announcement: ${param.announcementId}`,
        );
      }

      const meetingUpdates: {
        meetingEnumId?: number;
        startDate?: Date;
        endDate?: Date;
        isRegular?: boolean;
        location?: string;
        locationEn?: string;
        tag?: string;
      } = {};
      if (body.meetingEnumId !== undefined) {
        meetingUpdates.meetingEnumId = body.meetingEnumId;
      }
      if (body.startDate !== undefined) {
        meetingUpdates.startDate = body.startDate;
      }
      if (body.endDate !== undefined) {
        meetingUpdates.endDate = body.endDate;
      }
      if (body.isRegular !== undefined) {
        meetingUpdates.isRegular = body.isRegular;
      }
      if (body.location !== undefined) {
        meetingUpdates.location = body.location;
      }
      if (body.locationEn !== undefined) {
        meetingUpdates.locationEn = body.locationEn;
      }
      if (body.tag !== undefined) {
        meetingUpdates.tag = body.tag;
      }

      if (Object.keys(meetingUpdates).length > 0) {
        const [meetingUpdateResult] = await tx
          .update(Meeting)
          .set(meetingUpdates)
          .where(eq(Meeting.announcementId, param.announcementId));
        if (meetingUpdateResult.affectedRows !== 1) {
          logger.debug("[MeetingRepository] Failed to update meeting");
          tx.rollback();
          return false;
        }
        logger.debug(
          `[MeetingRepository] Updated meeting: ${param.announcementId}`,
        );
      }

      return true;
    });

    return isUpdateSucceed;
  }

  async deleteExecutiveMeetingAnnouncement(content: {
    announcementId: number;
  }) {
    const deletedAt = getKSTDate();
    const isDeleteSucceed = await this.db.transaction(async tx => {
      const [meetingDeleteResult] = await tx
        .update(Meeting)
        .set({ deletedAt })
        .where(eq(Meeting.announcementId, content.announcementId));

      if (meetingDeleteResult.affectedRows !== 1) {
        logger.debug("[MeetingRepository] Failed to delete meeting");
        tx.rollback();
        return false;
      }
      logger.debug(
        `[MeetingRepository] Deleted meeting: ${content.announcementId}`,
      );

      const [announcementDeleteResult] = await tx
        .update(MeetingAnnouncement)
        .set({ deletedAt })
        .where(eq(MeetingAnnouncement.id, content.announcementId));

      if (announcementDeleteResult.affectedRows !== 1) {
        logger.debug("[MeetingRepository] Failed to delete announcement");
        tx.rollback();
        return false;
      }
      logger.debug(
        `[MeetingRepository] Deleted announcement: ${content.announcementId}`,
      );

      return true;
    });

    return isDeleteSucceed;
  }

  async selectExecutiveMeetingNextDegree(query: { meetingEnumId: number }) {
    const thisYear = getKSTDate().getFullYear();
    const startDate = new Date(thisYear, 0, 1);
    const endDate = new Date(thisYear + 1, 0, 1);

    const result = await this.db
      .select()
      .from(Meeting)
      .where(
        and(
          eq(Meeting.meetingEnumId, query.meetingEnumId),
          gte(Meeting.startDate, startDate),
          lt(Meeting.startDate, endDate),
        ),
      );

    return result.length;
  }

  async insertMeetingAgendaAndMapping(
    meetingId: number,
    meetingEnumId: number,
    description: string,
    title: string,
  ) {
    const isInsertAgendaAndMappingSuccess = await this.db.transaction(
      async tx => {
        const [insertAgendaResult] = await tx.insert(MeetingAgenda).values({
          MeetingAgendaEnum: meetingEnumId,
          description,
          title,
          isEditableSelf: true,
          isEditableDivisionPresident: true,
          isEditableRepresentative: true,
        });

        if (insertAgendaResult.affectedRows !== 1) {
          logger.debug("[MeetingRepository] Failed to insert meeting agenda");
          tx.rollback();
          return false;
        }

        const agendaId = insertAgendaResult.insertId;
        logger.debug(
          `[MeetingRepository] Inserted meeting agenda: ${agendaId}`,
        );

        const getMax = await tx
          .select({ value: max(MeetingMapping.meetingAgendaPosition) })
          .from(MeetingMapping)
          .where(and(eq(MeetingMapping.meetingId, meetingId)));

        const maxAgendaPosition = getMax[0]?.value ?? 0; // CHACHA: undefined라면 0으로 set. <TEST 필요>

        const [insertMappingResult] = await tx.insert(MeetingMapping).values({
          meetingId,
          meetingAgendaId: agendaId,
          meetingAgendaPosition: maxAgendaPosition + 1,
          meetingAgendaEntityType: 3, // no agenda entity mapped yet.
        });

        if (insertMappingResult.affectedRows !== 1) {
          logger.debug("[MeetingRepository] Failed to insert meeting agenda");
          tx.rollback();
          return false;
        }

        const meetingMappingId = insertMappingResult.insertId;
        logger.debug(
          `[MeetingRepository] Inserted meeting agenda mapping: ${meetingMappingId}`,
        );

        await tx
          .update(Meeting)
          .set({ statusEnumId: 2 })
          .where(eq(Meeting.id, meetingId));
        logger.debug(
          `[MeetingRepository] Updated meeting status, meetingId: ${meetingId}`, // CHACHA: meeting-agenda mapping이 생겼으므로 안건 공개 상태로 변경!
        );

        return true;
      },
    );

    return isInsertAgendaAndMappingSuccess;
  }

  async updateMeetingAgenda(
    agendaId: number,
    agendaEnumId: number,
    description: string,
    title: string,
  ) {
    const updateAgendaNotDeletedResult = await this.db.transaction(async tx => {
      const checkDeleted = await tx
        .select({ isDeleted: MeetingAgenda.deletedAt })
        .from(MeetingAgenda)
        .where(eq(MeetingAgenda.id, agendaId));

      if (checkDeleted.length === 0) {
        logger.debug("[MeetingRepository] No such agenda exists."); // CHACHA: AgendatId가 유효한지
        return false;
      }

      if (checkDeleted[0]?.isDeleted) {
        logger.debug("[MeetingRepository] This agenda is deleted."); // CHACHA: Update 시에 deletedAt을 검사
        return false;
      }

      const [result] = await tx
        .update(MeetingAgenda)
        .set({
          MeetingAgendaEnum: agendaEnumId,
          title,
          description,
          updatedAt: sql<Date>`NOW()`,
        })
        .where(eq(MeetingAgenda.id, agendaId));

      if (result.affectedRows !== 1) {
        logger.debug("[MeetingRepository] Failed to update meeting agenda.");
        return false;
      }

      return result;
    });

    logger.debug(`[MeetingRepository] Updated meeting agenda: ${agendaId}`);
    return updateAgendaNotDeletedResult;
  }

  async deleteMeetingAgendaMapping(meetingId: number, agendaId: number) {
    const meetingAgendaMappingDeleteResult = await this.db.transaction(
      async tx => {
        const [deleteResult] = await tx // CHACHA: soft delete로 수정!
          .update(MeetingMapping)
          .set({ deletedAt: sql<Date>`NOW()` })
          .where(
            and(
              eq(MeetingMapping.meetingId, meetingId),
              eq(MeetingMapping.meetingAgendaId, agendaId),
            ),
          );

        if (deleteResult.affectedRows !== 1) {
          logger.debug(
            "[MeetingRepository] Failed to soft delete meeting agenda mapping.",
          );
          return false;
        }

        logger.debug(
          `[MeetingRepository] Soft deleted meeting agenda mapping: ${meetingId}, ${agendaId}`,
        );

        const getEveryMappingByMeetingId = await tx
          .select({ count: count() }) // CHACHA: 만약 모든 Meeting과 Agenda mapping이 deleted -> 그 Meeting은 공고 게시 상태로!
          .from(MeetingMapping)
          .where(and(eq(MeetingMapping.meetingId, meetingId)));

        const getEveryDeletedMappingByMeetingId = await tx
          .select({ count: count() })
          .from(MeetingMapping)
          .where(
            and(
              eq(MeetingMapping.meetingId, meetingId),
              not(eq(MeetingMapping.deletedAt, null)),
            ),
          );

        if (
          getEveryMappingByMeetingId[0]?.count ===
          getEveryDeletedMappingByMeetingId[0]?.count
        ) {
          // CHACHA: 만약 모든 Meeting과 Agenda mapping이 deleted -> 그 Meeting은 공고 게시 상태로!
          await tx
            .update(Meeting)
            .set({ statusEnumId: 1 })
            .where(eq(Meeting.id, meetingId));
          logger.debug(
            `[MeetingRepository] Updated meeting status, meetingId: ${meetingId}`,
          );
        }

        return deleteResult;
      },
    );

    return meetingAgendaMappingDeleteResult;
  }

  async getMeetingListByMeetingType(
    query: ApiMee012RequestQuery,
  ): Promise<ApiMee012ResponseOk> {
    const rows = await this.db
      .select({
        id: Meeting.id,
        meetingEnumId: Meeting.meetingEnumId,
        meetingTitle: MeetingAnnouncement.announcementTitle,
        meetingDate: Meeting.startDate,
        isRegular: Meeting.isRegular,
        tag: Meeting.tag,
        meetingStatus: Meeting.statusEnumId,
      })
      .from(Meeting)
      .leftJoin(
        MeetingAnnouncement,
        eq(Meeting.announcementId, MeetingAnnouncement.id),
      )
      .where(isNull(MeetingAnnouncement.deletedAt))
      .offset((query.pageOffset - 1) * query.itemCount)
      .limit(query.itemCount);

    // TODO(ym). 분과회의일 경우 title 뒤에 분과이름 추가하여 보내주기

    const result = {
      total: query.itemCount,
      items:
        query.meetingEnumId != null
          ? rows.filter(row => row.meetingEnumId === query.meetingEnumId)
          : rows,
      offset: query.pageOffset,
    };
    return result;
  }
}
