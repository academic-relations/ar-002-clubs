import { Inject, Injectable } from "@nestjs/common";

import { and, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import {
  // Meeting,
  // MeetingAnnouncement,
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

  async postExecutiveMeetingAnnouncement() //   contents: {
  //   meetingTypeId: number;
  //   announcementTitle: string;
  //   announcementContent: string;
  //   startDate: Date;
  //   endDate?: Date;
  //   isRegular: boolean;
  //   location: string;
  // }
  : Promise<boolean> {
    // const isInsertionSucceed = await this.db.transaction(async tx => {
    //   const [announcementInsertResult] = await tx.insert(MeetingAnnouncement).values({
    //     announcementTitle: contents.announcementTitle,
    //     announcementContent: contents.announcementContent,
    //   });

    //   if (announcementInsertResult.affectedRows !== 1) {
    //     return false;
    //   }

    //   const [meetingInsertResult] = await tx.insert(Meeting).values({
    //     announcementId: 1,  // 이거 실제로 받아오기
    //     meetingEnum: contents.meetingTypeId,
    //     startDate: contents.startDate,
    //     endDate: contents.endDate,
    //     isRegular: contents.isRegular,
    //     location: contents.location,
    //   });
    // }

    // return isInsertionSucceed;
    return true;
  }

  async getExecutiveMeetingAnnouncement() {
    return true;
  }

  async updateExecutiveMeetingAnnouncement() {
    return true;
  }

  async deleteExecutiveMeetingAnnouncement() {
    return true;
  }
}
