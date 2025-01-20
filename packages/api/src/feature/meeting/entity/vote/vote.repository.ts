import {
  // HttpException, HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";

import {
  and,
  count,
  countDistinct,
  eq,
  inArray,
  isNull,
  max,
  sql,
} from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
// import { getKSTDate } from "@sparcs-clubs/api/common/util/util";

import {
  MeetingAgendaVote,
  MeetingMapping,
  MeetingVoteChoice,
  MeetingVoteResult,
} from "@sparcs-clubs/api/drizzle/schema/meeting.schema";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

@Injectable()
export class VoteRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

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

  async putMeetingAgendaVote(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
    title: string,
    description: string,
  ) {
    const isPutVoteSuccess = await this.db.transaction(async tx => {
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

      const [putVoteResult] = await tx
        .update(MeetingAgendaVote)
        .set({
          title,
          description,
          updatedAt: sql<Date>`NOW()`,
        })
        .where(eq(MeetingAgendaVote.id, voteId));

      if (putVoteResult.affectedRows !== 1) {
        logger.debug("[EntityRepository] Failed to modify meeting agenda vote");
        tx.rollback();
        return false;
      }

      return true;
    });
    logger.debug(`[EntityRepository] Modified meeting agenda vote: ${voteId}`);

    return isPutVoteSuccess;
  }

  async putMeetingAgendaVoteChoices(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
    choices: Array<{ id: number; choice: string }>, // CHACHA: 여기서 id는 순서 구분의 용도
  ) {
    const isPutVoteChoicesSuccess = await this.db.transaction(async tx => {
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

    return isPutVoteChoicesSuccess;
  }

  async putMeetingAgendaVoteUserChoice(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
    choiceId: number, // CHACHA: 여기서 choiceId는 MeetingVoteChoice.id
  ) {
    const isPutUserVoteResultSuccess = await this.db.transaction(async tx => {
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

      const [putVoteResultResult] = await tx
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

      if (putVoteResultResult.affectedRows !== 1) {
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

    return isPutUserVoteResultSuccess;
  }

  async deleteMeetingAgendaVote(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
  ) {
    const isDeleteVoteSuccess = await this.db.transaction(async tx => {
      const [deleteFromVoteResult] = await tx
        .update(MeetingAgendaVote)
        .set({ deletedAt: sql<Date>`Now()` })
        .where(eq(MeetingAgendaVote.id, voteId));

      if (deleteFromVoteResult.affectedRows !== 1) {
        logger.debug(
          "[EntityRepository] Failed to soft delete meeting agenda vote.",
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
            eq(MeetingMapping.meetingAgendaVoteId, voteId),
          ),
        );

      if (deleteFromMappingResult.affectedRows !== 1) {
        logger.debug(
          "[EntityRepository] Failed to soft delete meeting agenda vote mapping.",
        );
        return false;
      }

      logger.debug(
        `[EntityRepository] Soft deleted meeting agenda vote mapping: ${meetingId}, ${agendaId}, ${voteId}`,
      );

      return deleteFromMappingResult;
    });

    return isDeleteVoteSuccess;
  }

  async deleteMeetingAgendaVoteForUser(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
  ) {
    const isDeleteVoteSuccess = await this.db.transaction(async tx => {
      const [deleteFromVoteResult] = await tx
        .update(MeetingVoteResult)
        .set({ deletedAt: sql<Date>`Now()` })
        .where(
          and(
            eq(MeetingVoteResult.id, voteId),
            eq(MeetingVoteResult.id, userId),
          ),
        );

      if (deleteFromVoteResult.affectedRows !== 1) {
        logger.debug(
          "[EntityRepository] Failed to soft delete meeting agenda vote result for user.",
        );
        return false;
      }

      logger.debug(
        `[EntityRepository] Soft deleted meeting agenda vote result for user: ${meetingId}, ${agendaId}, ${voteId}, ${userId}`,
      );

      return deleteFromVoteResult;
    });

    return isDeleteVoteSuccess;
  }

  async getMeetingAgendaVote(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
  ) {
    const isGetVoteSuccess = await this.db
      .select({
        title: MeetingAgendaVote.title,
        description: MeetingAgendaVote.description,
      })
      .from(MeetingAgendaVote)
      .where(
        and(
          eq(MeetingAgendaVote.id, voteId),
          isNull(MeetingAgendaVote.deletedAt),
        ),
      );

    if (isGetVoteSuccess.length !== 1) {
      logger.debug("[EntityRepository] Failed to retrieve one vote from table");
      return false;
    }

    const title = isGetVoteSuccess[0]?.title;
    const description = isGetVoteSuccess[0]?.description;

    const choices = await this.db
      .select({
        id: MeetingVoteChoice.id,
        choice: MeetingVoteChoice.choice,
      })
      .from(MeetingVoteChoice)
      .where(
        and(
          eq(MeetingVoteChoice.voteId, voteId),
          isNull(MeetingVoteChoice.deletedAt),
        ),
      );

    return { title, description, choices };
  }

  async getMeetingAgendaVoteWithResults(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
  ) {
    const isGetVoteSuccess = await this.db
      .select({
        title: MeetingAgendaVote.title,
        description: MeetingAgendaVote.description,
      })
      .from(MeetingAgendaVote)
      .where(
        and(
          eq(MeetingAgendaVote.id, voteId),
          isNull(MeetingAgendaVote.deletedAt),
        ),
      );

    if (isGetVoteSuccess.length !== 1) {
      logger.debug("[EntityRepository] Failed to retrieve one vote from table");
      return false;
    }

    const title = isGetVoteSuccess[0]?.title;
    const description = isGetVoteSuccess[0]?.description;

    const choices = await this.db
      .select({
        id: MeetingVoteChoice.id,
        choice: MeetingVoteChoice.choice,
      })
      .from(MeetingVoteChoice)
      .where(
        and(
          eq(MeetingVoteChoice.voteId, voteId),
          isNull(MeetingVoteChoice.deletedAt),
        ),
      );

    const getChoiceForUser = await this.db
      .select({
        id: MeetingVoteResult.choiceId,
      })
      .from(MeetingVoteResult)
      .where(
        and(
          eq(MeetingVoteResult.userId, userId),
          eq(MeetingVoteResult.voteId, voteId),
          isNull(MeetingVoteResult.deletedAt),
        ),
      );

    const choiceId = getChoiceForUser[0]?.id;

    // if getChoiceForUser.length === 0: user cancelled vote.

    return { title, description, choices, choiceId };
  }

  async getMeetingAgendaVoteFinal(
    userId: number,
    meetingId: number,
    agendaId: number,
    voteId: number,
  ) {
    const isGetVoteSuccess = await this.db
      .select({
        title: MeetingAgendaVote.title,
        description: MeetingAgendaVote.description,
      })
      .from(MeetingAgendaVote)
      .where(
        and(
          eq(MeetingAgendaVote.id, voteId),
          isNull(MeetingAgendaVote.deletedAt),
        ),
      );

    if (isGetVoteSuccess.length !== 1) {
      logger.debug("[EntityRepository] Failed to retrieve one vote from table");
      return false;
    }

    const title = isGetVoteSuccess[0]?.title;
    const description = isGetVoteSuccess[0]?.description;

    const getChoices = await this.db
      .select({
        id: MeetingVoteChoice.id,
        choice: MeetingVoteChoice.choice,
      })
      .from(MeetingVoteChoice)
      .where(
        and(
          eq(MeetingVoteChoice.voteId, voteId),
          isNull(MeetingVoteChoice.deletedAt),
        ),
      );

    const choiceArray = getChoices.map(e => e.id);

    const results = await this.db
      .select({
        id: MeetingVoteResult.choiceId,
        votes: countDistinct(MeetingVoteResult.userId),
      })
      .from(MeetingVoteResult)
      .where(
        and(
          inArray(MeetingVoteResult.choiceId, choiceArray),
          isNull(MeetingVoteResult.deletedAt),
        ),
      )
      .groupBy(MeetingVoteResult.choiceId); // choiceId 별 그룹화

    return { title, description, results };
  }
}
