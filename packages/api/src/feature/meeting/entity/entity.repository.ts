import {
  // HttpException, HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";

import { and, count, eq, max, sql } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
// import { getKSTDate } from "@sparcs-clubs/api/common/util/util";

import {
  MeetingAgendaContent,
  MeetingAgendaVote,
  MeetingMapping,
  MeetingVoteChoice,
  MeetingVoteResult,
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

  // CHACHA: 새 Vote 삽입 뒤 Choices에도 삽입, Mapping 반영
  async postMeetingAgendaVote(
    userId: number,
    meetingId: number,
    agendaId: number,
    title: string,
    description: string,
    choices: Array<{ id: number; choice: string }>, // CHACHA: 여기서 id는 순서 구분의 용도
  ) {
    const isPostVoteSuccess = await this.db.transaction(async tx => {
      const [insertVoteResult] = await tx.insert(MeetingAgendaVote).values({
        title,
        description,
      });

      if (insertVoteResult.affectedRows !== 1) {
        logger.debug("[EntityRepository] Failed to insert meeting agenda vote");
        tx.rollback();
        return false;
      }

      const voteId = insertVoteResult.insertId;
      logger.debug(
        `[EntityRepository] Inserted meeting agenda vote: ${voteId}`,
      );

      const insertChoicesResults = await Promise.all(
        choices.map(choice =>
          tx.insert(MeetingVoteChoice).values({
            voteId,
            choice: choice.choice,
          }),
        ),
      );

      if (insertChoicesResults.some(([result]) => result.affectedRows !== 1)) {
        throw new Error("[EntityRepository] Failed to insert vote choices.");
      }

      logger.debug(
        `[EntityRepository] Inserted meeting agenda vote choices: ${voteId}`,
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
        meetingAgendaEntityType: 2, // TODO: vote enum으로 교체
        meetingAgendaContentId: voteId,
        meetingAgendaEntityPosition: maxAgendaEntityPosition + 1,
      });

      if (insertMappingResult.affectedRows !== 1) {
        logger.debug(
          "[EntityRepository] Failed to insert meeting agenda vote mapping",
        );
        tx.rollback();
        return false;
      }

      const meetingMappingId = insertMappingResult.insertId;
      logger.debug(
        `[EntityRepository] Inserted meeting agenda vote mapping: ${meetingMappingId}`,
      );

      return true;
    });

    return isPostVoteSuccess;
  }

  async postMeetingAgendaVoteResult(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
    choiceId: number, // CHACHA: 여기서 choiceId는 MeetingVoteChoice.id
  ) {
    const isPostVoteResultSuccess = await this.db.transaction(async tx => {
      const [isChoiceIdValid] = await tx
        .select()
        .from(MeetingVoteChoice)
        .where(eq(MeetingVoteChoice.id, choiceId));

      if (!isChoiceIdValid) {
        // CHACHA: 상응하는 choice id가 없을 때 isChoiceIdValid가 어떻게 오는지 확인 필요
        logger.debug("[EntityRepository] Choice Id not valid");
        tx.rollback();
        return false;
      }

      const [insertVoteResultResult] = await tx
        .insert(MeetingVoteResult)
        .values({
          voteId,
          userId,
          choiceId,
        });

      if (insertVoteResultResult.affectedRows !== 1) {
        logger.debug(
          "[EntityRepository] Failed to insert meeting agenda vote result",
        );
        tx.rollback();
        return false;
      }

      const resultId = insertVoteResultResult.insertId;

      logger.debug(
        `[EntityRepository] Inserted meeting agenda vote result ${resultId}`,
      );
      return true;
    });

    return isPostVoteResultSuccess;
  }

  async patchMeetingAgendaVote(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
    title: string,
    description: string,
  ) {
    const isPatchVoteSuccess = await this.db.transaction(async tx => {
      const checkDeleted = await tx
        .select({ isDeleted: MeetingAgendaVote.deletedAt })
        .from(MeetingAgendaVote)
        .where(eq(MeetingAgendaVote.id, voteId));

      if (checkDeleted.length === 0) {
        logger.debug("[EntitygRepository] No such vote exists."); // CHACHA: VoteId가 유효한지
        return false;
      }

      if (checkDeleted[0]?.isDeleted) {
        logger.debug("[EntityRepository] This vote is deleted."); // CHACHA: Update 시에 deletedAt을 검사
        return false;
      }

      const [patchVoteResult] = await tx
        .update(MeetingAgendaVote)
        .set({
          title,
          description,
          updatedAt: sql<Date>`NOW()`,
        })
        .where(eq(MeetingAgendaVote.id, voteId));

      if (patchVoteResult.affectedRows !== 1) {
        logger.debug("[EntityRepository] Failed to modify meeting agenda vote");
        tx.rollback();
        return false;
      }

      return true;
    });
    logger.debug(`[EntityRepository] Modified meeting agenda vote: ${voteId}`);

    return isPatchVoteSuccess;
  }

  async patchMeetingAgendaVoteChoices(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
    choices: Array<{ id: number; choice: string }>, // CHACHA: 여기서 id는 순서 구분의 용도
  ) {
    const isPatchVoteChoicesSuccess = await this.db.transaction(async tx => {
      const countChoices = await tx
        .select({ value: count() })
        .from(MeetingVoteChoice)
        .where(eq(MeetingVoteChoice.voteId, voteId));

      const [deleteOldChoices] = await tx
        .update(MeetingVoteChoice)
        .set({
          deletedAt: sql<Date>`NOW()`,
        })
        .where(eq(MeetingVoteChoice.voteId, voteId));

      if (deleteOldChoices.affectedRows !== countChoices[0]?.value) {
        logger.debug("[EntityRepository] Failed to soft delete old choices.");
        tx.rollback();
        return false;
      }

      const insertNewChoices = await Promise.all(
        choices.map(choice =>
          tx.insert(MeetingVoteChoice).values({
            voteId,
            choice: choice.choice,
          }),
        ),
      );

      if (insertNewChoices.some(([result]) => result.affectedRows !== 1)) {
        throw new Error(
          "[EntityRepository] Failed to insert new vote choices to modify them.",
        );
      }

      logger.debug(
        `[EntityRepository] Modified meeting agenda vote choices: ${voteId}`,
      );

      return true;
    });

    return isPatchVoteChoicesSuccess;
  }

  async patchMeetingAgendaVoteUserChoice(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
    choiceId: number, // CHACHA: 여기서 choiceId는 MeetingVoteChoice.id
  ) {
    const isPatchUserVoteResultSuccess = await this.db.transaction(async tx => {
      const [isChoiceIdValid] = await tx
        .select()
        .from(MeetingVoteChoice)
        .where(eq(MeetingVoteChoice.id, choiceId));

      if (!isChoiceIdValid) {
        // CHACHA: 상응하는 choice id가 없을 때 isChoiceIdValid가 어떻게 오는지 확인 필요
        logger.debug("[EntityRepository] Choice Id not valid");
        tx.rollback();
        return false;
      }

      const [patchVoteResultResult] = await tx
        .update(MeetingVoteResult)
        .set({
          choiceId,
        })
        .where(
          and(
            eq(MeetingVoteResult.voteId, voteId),
            eq(MeetingVoteResult.userId, userId),
          ),
        );

      if (patchVoteResultResult.affectedRows !== 1) {
        logger.debug(
          "[EntityRepository] Failed to modify user's meeting agenda vote result",
        );
        tx.rollback();
        return false;
      }

      logger.debug(
        `[EntityRepository] Inserted meeting agenda vote result ${voteId}, ${userId}`,
      );
      return true;
    });

    return isPatchUserVoteResultSuccess;
  }
}
