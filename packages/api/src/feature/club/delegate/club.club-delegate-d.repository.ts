import { Inject, Injectable } from "@nestjs/common";
import {
  ClubDelegateChangeRequestStatusEnum,
  ClubDelegateEnum,
} from "@sparcs-clubs/interface/common/enum/club.enum";

import {
  and,
  count,
  eq,
  gte,
  isNotNull,
  isNull,
  lte,
  not,
  notInArray,
  or,
} from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";

import { getKSTDate, takeUnique } from "src/common/util/util";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import {
  Club,
  ClubDelegateChangeRequest,
  ClubDelegateD,
  ClubStudentT,
} from "src/drizzle/schema/club.schema";
import { Student } from "src/drizzle/schema/user.schema";

@Injectable()
export class ClubDelegateDRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  /**
   * @param id 삭제할 변경 요청의 id
   */
  async deleteDelegatChangeRequestById(param: {
    id: number;
  }): Promise<boolean> {
    const [result] = await this.db
      .update(ClubDelegateChangeRequest)
      .set({
        deletedAt: getKSTDate(),
      })
      .where(eq(ClubDelegateChangeRequest.id, param.id));
    return result.affectedRows > 0;
  }

  /**
   * @param studentId 변경을 신청한 학생의 id
   * @returns 해당 학생이 신청한 변경 요청의 목록, 로직에 문제가 없다면 배열의 길이가 항상 1 이하여야 합니다.
   */
  async findDelegateChangeRequestByPrevStudentId(param: { studentId: number }) {
    const result = await this.db
      .select()
      .from(ClubDelegateChangeRequest)
      .where(
        and(
          eq(
            ClubDelegateChangeRequest.clubDelegateChangeRequestStatusEnumId,
            ClubDelegateChangeRequestStatusEnum.Applied,
          ),
          eq(ClubDelegateChangeRequest.prevStudentId, param.studentId),
          isNull(ClubDelegateChangeRequest.deletedAt),
        ),
      );
    return result;
  }

  /**
   * @param clubId 변경 신청을 조회하고자 하는 동아리의 id
   * @returns 해당 동아리의 모든 대표자 변경 요청의 목록
   */
  async findDelegateChangeRequestByClubId(param: { clubId: number }) {
    const result = await this.db
      .select()
      .from(ClubDelegateChangeRequest)
      .where(
        and(
          eq(ClubDelegateChangeRequest.clubId, param.clubId),
          isNull(ClubDelegateChangeRequest.deletedAt),
        ),
      );
    return result;
  }

  /**
   * @param id 변경 요청의 id
   *
   * @returns id가 일치하는 요청의 목록,
   id가 유일하기 때문에 배열의 길이가 항상 1 이하여야 합니다.
   */
  async findDelegateChangeRequestById(param: { id: number }) {
    const result = await this.db
      .select()
      .from(ClubDelegateChangeRequest)
      .where(
        and(
          eq(ClubDelegateChangeRequest.id, param.id),
          isNull(ClubDelegateChangeRequest.deletedAt),
        ),
      );
    return result;
  }

  /**
   * @param studentId 변경의 대상이 된 학생의 id
   * @returns 해당 학생이 변경의 대상이 된 요청의 목록, 로직에 문제가 없다면 배열의 길이가 항상 1 이하여야 합니다.
   */
  async findDelegateChangeRequestByStudentId(param: { studentId: number }) {
    const result = await this.db
      .select()
      .from(ClubDelegateChangeRequest)
      .where(
        and(
          eq(
            ClubDelegateChangeRequest.clubDelegateChangeRequestStatusEnumId,
            ClubDelegateChangeRequestStatusEnum.Applied,
          ),
          eq(ClubDelegateChangeRequest.studentId, param.studentId),
          isNull(ClubDelegateChangeRequest.deletedAt),
        ),
      );
    return result;
  }

  // 가장 최근 대표자의 이름을 가져오기
  async findRepresentativeName(
    clubId: number,
    startTerm?: Date,
  ): Promise<{ name: string }> {
    const currentDate = getKSTDate();

    const representative = await this.db
      .select({ name: Student.name })
      .from(ClubDelegateD)
      .leftJoin(Student, eq(Student.id, ClubDelegateD.studentId))
      .where(
        and(
          eq(ClubDelegateD.clubId, clubId),
          eq(ClubDelegateD.ClubDelegateEnumId, 1),
          lte(ClubDelegateD.startTerm, startTerm || currentDate),
          or(
            gte(ClubDelegateD.endTerm, startTerm || currentDate),
            isNull(ClubDelegateD.endTerm),
          ),
        ),
      )
      .orderBy(ClubDelegateD.endTerm)
      .limit(1)
      .then(takeUnique);

    return representative;
  }

  /**
   * @param clubId 동아리 id
   * @returns 해당 동아리의 대표자 id 목록을 가져옵니다.
   */
  async findRepresentativeIdListByClubId(
    clubId: number,
  ): Promise<Array<{ studentId: number }>> {
    const result = await this.findDelegateByClubId(clubId);

    return result.map(e => ({ studentId: e.studentId }));
  }

  /**
   * @param clubId 동아리 id
   * @returns 해당 동아리의 대표자 정보 목록을 가져옵니다.
   */
  async findDelegateByClubId(clubId: number) {
    const currentDate = getKSTDate();

    const delegate = await this.db
      .select()
      .from(ClubDelegateD)
      .where(
        and(
          eq(ClubDelegateD.clubId, clubId),
          lte(ClubDelegateD.startTerm, currentDate),
          or(
            gte(ClubDelegateD.endTerm, currentDate),
            isNull(ClubDelegateD.endTerm),
          ),
          isNull(ClubDelegateD.deletedAt),
        ),
      )
      .orderBy(ClubDelegateD.endTerm);

    return delegate;
  }

  /**
   * @param studentId 학생 id
   * @returns 해당 학생이 대표자 정보를 목록을 가져옵니다.
   * 로직에 문제가 없을경우 크기가 0 또는 1인 리스트가 리턴됩니다.
   */
  async findDelegateByStudentId(studentId: number) {
    const currentDate = getKSTDate();

    const delegate = await this.db
      .select()
      .from(ClubDelegateD)
      .where(
        and(
          eq(ClubDelegateD.studentId, studentId),
          lte(ClubDelegateD.startTerm, currentDate),
          or(
            gte(ClubDelegateD.endTerm, currentDate),
            isNull(ClubDelegateD.endTerm),
          ),
          isNull(ClubDelegateD.deletedAt),
        ),
      )
      .orderBy(ClubDelegateD.endTerm);

    return delegate;
  }

  async findRepresentativeByClubIdAndStudentId(
    studentId: number,
    clubId: number,
  ): Promise<boolean> {
    const crt = getKSTDate();
    const result = !!(await this.db
      .select({ id: ClubDelegateD.id })
      .from(ClubDelegateD)
      .where(
        and(
          eq(ClubDelegateD.clubId, clubId),
          eq(ClubDelegateD.studentId, studentId),
          lte(ClubDelegateD.startTerm, crt),
          or(gte(ClubDelegateD.endTerm, crt), isNull(ClubDelegateD.endTerm)),
        ),
      )
      .limit(1)
      .then(takeUnique));
    return result;
  }

  /**
   * @param clubId
   * @param semesterId
   * @param filterClubDelegateEnum 후보자로 선정하기 위해 필터링되어야하는 ClubDelegateEnum 목록
   * 예를 들어, 대표자 후보를 얻기 위해 이 쿼리를 이용할 경우 filterClubDelegateEnum은 [filterClubDelegateEnum.Representative]
   * 가 되어야 합니다.
   * @returns 해당 동아리에서 해당 학기에 대표자 지위를 넘길 수 있는 학생 목록을 리턴합니다.
   */
  async selectDelegateCandidatesByClubId(param: {
    clubId: number;
    semesterId: number;
    filterClubDelegateEnum: Array<ClubDelegateEnum>;
  }) {
    const today = getKSTDate();
    logger.debug(param.semesterId);
    logger.debug(today);
    const result = await this.db
      .select()
      .from(Club)
      .innerJoin(
        ClubStudentT,
        and(eq(Club.id, ClubStudentT.clubId), isNull(ClubStudentT.deletedAt)),
      )
      .innerJoin(
        Student,
        and(eq(ClubStudentT.studentId, Student.id), isNull(Student.deletedAt)),
      )
      .leftJoin(
        ClubDelegateD,
        and(
          eq(ClubDelegateD.studentId, Student.id),
          lte(ClubDelegateD.startTerm, today),
          or(gte(ClubDelegateD.endTerm, today), isNull(ClubDelegateD.endTerm)),
          isNull(ClubDelegateD.deletedAt),
        ),
      )
      .where(
        and(
          eq(Club.id, param.clubId),
          eq(ClubStudentT.semesterId, param.semesterId),
          param.filterClubDelegateEnum.length !== 0
            ? or(
                notInArray(
                  ClubDelegateD.ClubDelegateEnumId,
                  param.filterClubDelegateEnum,
                ),
                isNull(ClubDelegateD.ClubDelegateEnumId),
              )
            : undefined,
          not(
            and(
              not(eq(ClubDelegateD.clubId, param.clubId)),
              isNotNull(ClubDelegateD.id),
            ),
          ),
          isNull(Club.deletedAt),
        ),
      );
    // logger.debug(result); // 로그가 너무 길어서 주석처리해 두었어요
    return result;
  }

  /**
   * @param studentId 신청자 학생 Id
   * @param targetStudentId 변경 대상 학생 Id
   * @param clubId 동아리 Id
   * @param clubDelegateEnumId 대표자 지위 Id
   *
   * @description 동아리 대표자의 변경을 요청합니다.
   *
   * @returns insertion의 성공 여부를 리턴합니다.
   */
  async insertClubDelegateChangeRequest(param: {
    studentId: number;
    targetStudentId: number;
    clubId: number;
    clubDelegateEnumId: number;
  }): Promise<boolean> {
    const now = getKSTDate();

    const result = await this.db.transaction(async tx => {
      const [requestInsertionResult] = await tx
        .insert(ClubDelegateChangeRequest)
        .values({
          clubId: param.clubId,
          prevStudentId: param.studentId,
          studentId: param.targetStudentId,
          clubDelegateChangeRequestStatusEnumId:
            ClubDelegateChangeRequestStatusEnum.Applied,
          createdAt: now,
        });

      if (requestInsertionResult.affectedRows !== 1) {
        logger.debug("[insertClubDelegateChangeRequest] failed to insert");
        tx.rollback();
        return false;
      }

      return true;
    });

    return result;
  }

  /**
   * @param clubId 동아리 id
   * @param clubDelegateEnumId 대표자 분류 id
   * @param studentId 지정할 학생 id. undefined인 경우 지위만 해제시킵니다.
   *
   * @description 해당 학생을 동아리의 대표자로 지정합니다.
   * 기존에 해당 지위로 지정되었던 학생이 존재할 경우 지위가 해제됩니다.
   *
   * @returns 대의원 변경의 성공 여부를 리턴합니다.
   */
  async updateDelegate(param: {
    clubId: number;
    clubDelegateEnumId: number;
    studentId: number;
  }): Promise<boolean> {
    const now = getKSTDate();

    const result = await this.db.transaction(async tx => {
      const [delegateUpdateResult] = await tx
        .update(ClubDelegateD)
        .set({
          endTerm: now,
        })
        .where(
          and(
            eq(ClubDelegateD.clubId, param.clubId),
            eq(ClubDelegateD.ClubDelegateEnumId, param.clubDelegateEnumId),
            lte(ClubDelegateD.startTerm, now),
            or(gte(ClubDelegateD.endTerm, now), isNull(ClubDelegateD.endTerm)),
            isNull(ClubDelegateD.deletedAt),
          ),
        );
      // 변경된 row는 0줄 또는 한줄이어야 합니다.
      if (delegateUpdateResult.affectedRows > 1) {
        logger.debug("[updateDelegate] more than 1 row is modified. Rollback.");
        tx.rollback();
        return false;
      }

      if (param.studentId === 0) return true;

      const [delegateInsertResult] = await tx.insert(ClubDelegateD).values({
        clubId: param.clubId,
        studentId: param.studentId,
        ClubDelegateEnumId: param.clubDelegateEnumId,
        startTerm: now,
      });
      if (delegateInsertResult.affectedRows !== 1) {
        logger.debug("[updateDelegate] insertion is failed Rollback.");
        tx.rollback();
        return false;
      }

      return true;
    });

    return result;
  }

  async updateClubDelegateChangeRequest(param: {
    id: number;
    clubDelegateChangeRequestStatusEnumId: ClubDelegateChangeRequestStatusEnum;
  }): Promise<boolean> {
    const [result] = await this.db
      .update(ClubDelegateChangeRequest)
      .set({
        clubDelegateChangeRequestStatusEnumId:
          param.clubDelegateChangeRequestStatusEnumId,
      })
      .where(eq(ClubDelegateChangeRequest.id, param.id));

    return result.affectedRows === 1;
  }

  async isPresidentByStudentIdAndClubId(studentId: number, clubId: number) {
    const cur = getKSTDate();
    const presidentEnumId = ClubDelegateEnum.Representative;
    const { president } = await this.db
      .select({ president: count(ClubDelegateD.id) })
      .from(ClubDelegateD)
      .where(
        and(
          eq(ClubDelegateD.studentId, studentId),
          eq(ClubDelegateD.clubId, clubId),
          eq(ClubDelegateD.ClubDelegateEnumId, presidentEnumId),
          lte(ClubDelegateD.startTerm, cur),
          or(gte(ClubDelegateD.endTerm, cur), isNull(ClubDelegateD.endTerm)),
          isNull(ClubDelegateD.deletedAt),
        ),
      )
      .then(takeUnique);
    if (president !== 0) return true;
    return false;
  }
}
