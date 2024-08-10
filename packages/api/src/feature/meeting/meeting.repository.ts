import { Inject, Injectable } from "@nestjs/common";

import { and, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
import { getKSTDate } from "@sparcs-clubs/api/common/util/util";
import {
  Meeting,
  MeetingAnnouncement,
  MeetingAttendanceTimeT,
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

  async vote(choiceId: number, userId: number) {
    const result = await this.db.insert(MeetingVoteResult).values({
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
    location: string;
    locationEn: string;
  }): Promise<boolean> {
    // TODO: string인 필수 field validation
    const isInsertionSucceed = await this.db.transaction(async tx => {
      const [announcementInsertResult] = await tx
        .insert(MeetingAnnouncement)
        .values({
          announcementTitle: contents.announcementTitle,
          announcementContent: contents.announcementContent,
        });

      if (announcementInsertResult.affectedRows !== 1) {
        logger.debug("[MeetingRepository] Failed to insert announcement");
        tx.rollback();
        return false;
      }
      logger.debug(
        `[MeetingRepository] Inserted announcement: ${announcementInsertResult.insertId}`,
      );

      const [meetingInsertResult] = await tx.insert(Meeting).values({
        announcementId: announcementInsertResult.insertId,
        meetingEnumId: contents.meetingEnumId,
        startDate: contents.startDate,
        endDate: contents.endDate,
        isRegular: contents.isRegular,
        location: contents.location,
        locationEn: contents.locationEn,
      });
      if (meetingInsertResult.affectedRows !== 1) {
        logger.debug("[MeetingRepository] Failed to insert meeting");
        tx.rollback();
        return false;
      }
      logger.debug(
        `[MeetingRepository] Inserted meeting: ${meetingInsertResult.insertId}`,
      );
      return true;
    });
    return isInsertionSucceed;
  }

  async selectMeetingAnnouncementById(announcementId: number) {
    const result = await this.db
      .select({
        announcementTitle: MeetingAnnouncement.announcementTitle,
        announcementContent: MeetingAnnouncement.announcementContent,
      })
      .from(MeetingAnnouncement)
      .where(eq(MeetingAnnouncement.id, announcementId))
      .execute();

    if (result.length !== 1) {
      logger.debug(
        `[MeetingRepository] Failed to select announcement: ${announcementId}`,
      );
      return null;
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
}
