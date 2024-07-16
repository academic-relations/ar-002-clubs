import { Inject, Injectable } from "@nestjs/common";
import { and, eq, gte, lte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { takeUnique } from "@sparcs-clubs/api/common/util/util";
import { SemesterD } from "@sparcs-clubs/api/drizzle/schema/club.schema";
import { RefreshToken } from "@sparcs-clubs/api/drizzle/schema/refresh-token.schema";
import {
  Employee,
  Executive,
  ExecutiveT,
  Professor,
  Student,
  StudentT,
  User,
} from "@sparcs-clubs/api/drizzle/schema/user.schema";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

@Injectable()
export class AuthRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findOrCreateUser(
    email: string,
    studentNumber: string,
    sid: string,
    name: string,
    type: string,
    department: string,
  ): Promise<{
    id: number;
    sid: string;
    name: string;
    email: string;
    undergraduate?: {
      id: number;
      number: number;
    };
    master?: {
      id: number;
      number: number;
    };
    doctor?: {
      id: number;
      number: number;
    };
    executive?: {
      id: number;
      studentId: number;
    };
    professor?: {
      id: number;
    };
    employee?: {
      id: number;
    };
  }> {
    // User table에 해당 email이 있는지 확인 후 upsert
    let user = await this.db
      .select()
      .from(User)
      .where(eq(User.email, email))
      .then(takeUnique);
    if (user) {
      await this.db
        .update(User)
        .set({ name })
        .where(eq(User.id, user.id))
        .execute();
    } else {
      await this.db.insert(User).values({ sid, name, email }).execute();
    }
    user = await this.db
      .select()
      .from(User)
      .where(eq(User.email, email))
      .then(takeUnique);

    let result: {
      id: number;
      sid: string;
      name: string;
      email: string;
      undergraduate?: {
        id: number;
        number: number;
      };
      master?: {
        id: number;
        number: number;
      };
      doctor?: {
        id: number;
        number: number;
      };
      executive?: {
        id: number;
        studentId: number;
      };
      professor?: {
        id: number;
      };
      employee?: {
        id: number;
      };
    } = {
      id: user.id,
      sid: user.sid,
      name: user.name,
      email: user.email,
    };

    // type이 "Student"인 경우 student table에서 해당 studentNumber이 있는지 확인 후 upsert
    // student_t에서 이번 학기의 해당 student_id이 있는지 확인 후 upsert
    if (type === "Student") {
      let student = await this.db
        .select()
        .from(Student)
        .where(eq(Student.number, parseInt(studentNumber)))
        .then(takeUnique);
      if (student) {
        await this.db
          .update(Student)
          .set({ userId: user.id, name })
          .where(eq(Student.id, student.id))
          .execute();
      } else {
        await this.db
          .insert(Student)
          .values({
            name,
            number: parseInt(studentNumber),
            userId: user.id,
            email,
          })
          .execute();
      }
      student = await this.db
        .select()
        .from(Student)
        .where(eq(Student.number, parseInt(studentNumber)))
        .then(takeUnique);

      // studentNumber의 뒤 네자리가 2000 미만일 경우 studentEnum을 1, 5000미만일 경우 2, 6000미만일 경우 1, 나머지는 3으로 설정
      let studentEnum = 3;
      let studentStatusEnum = 2;
      if (parseInt(studentNumber.slice(-4)) < 2000) {
        studentEnum = 1;
        studentStatusEnum = 1;
      } else if (parseInt(studentNumber.slice(-4)) < 6000) studentEnum = 2;
      else if (parseInt(studentNumber.slice(-4)) < 7000) studentEnum = 1;

      // student 테이블에서 해당 user id를 모두 검색
      // undergraduate, master, doctor 중 해당하는 경우 result에 추가
      const students = await this.db
        .select()
        .from(Student)
        .where(eq(Student.userId, user.id));

      // eslint-disable-next-line no-restricted-syntax, @typescript-eslint/no-shadow
      for (const student of students) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        let studentEnum = 3;
        if (student.number % 10000 < 2000) studentEnum = 1;
        else if (student.number % 10000 < 6000) studentEnum = 2;
        else if (student.number % 10000 < 7000) studentEnum = 1;

        if (studentEnum === 1) {
          result = {
            ...result,
            undergraduate: { id: student.id, number: student.number },
          };
        } else if (studentEnum === 2) {
          result = {
            ...result,
            master: { id: student.id, number: student.number },
          };
        } else if (studentEnum === 3) {
          result = {
            ...result,
            doctor: { id: student.id, number: student.number },
          };
        }
      }

      // 오늘 날짜를 기준으로 semester_d 테이블에서 해당 학기를 찾아서 semester_id, startTerm, endTerm을 가져옴
      const currentDate = new Date();
      const semester = await this.db
        .select()
        .from(SemesterD)
        .where(
          and(
            lte(SemesterD.startTerm, currentDate),
            gte(SemesterD.endTerm, currentDate),
          ),
        )
        .then(takeUnique);

      // eslint-disable-next-line prefer-destructuring
      const studentT = await this.db
        .select()
        .from(StudentT)
        .where(
          and(
            eq(StudentT.studentId, student.id),
            eq(StudentT.semesterId, semester.id),
          ),
        )
        .then(takeUnique);

      if (studentT) {
        await this.db
          .update(StudentT)
          .set({ department: parseInt(department) })
          .where(
            and(
              eq(StudentT.studentId, student.id),
              eq(StudentT.semesterId, semester.id),
            ),
          );
      } else {
        await this.db
          .insert(StudentT)
          .values({
            studentId: student.id,
            studentEnum,
            studentStatusEnum,
            department: parseInt(department),
            semesterId: semester.id,
            startTerm: semester.startTerm,
            endTerm: semester.endTerm,
          })
          .execute();
      }

      // type이 "Student"인 경우 executive table에서 해당 studentNumber이 있는지 확인
      // 있으면 해당 칼럼의 user_id를 업데이트
      await this.db
        .update(Executive)
        .set({ userId: user.id })
        .where(eq(Executive.studentId, student.id))
        .execute();

      const executive = await this.db
        .select()
        .from(Executive)
        .innerJoin(
          ExecutiveT,
          and(
            eq(ExecutiveT.executiveId, Executive.id),
            gte(ExecutiveT.endTerm, currentDate),
            lte(ExecutiveT.startTerm, currentDate),
          ),
        )
        .where(eq(Executive.studentId, student.id))
        .then(takeUnique);
      // 만약 executive가 존재하는 경우 result에 executive를 추가
      // TODO: executive table에서 해당 executiveId이 있는지 확인 후 기간 내에 존재할 경우에만 쿠키에 추가
      if (executive) {
        result = {
          ...result,
          executive: {
            id: executive.executive.id,
            studentId: executive.executive.studentId,
          },
        };
      }
    }
    // TODO
    // type이 "Teacher"를 포함하는 경우 professor table에서 해당 email이 있는지 확인 후 upsert
    // professor_t에서 해당 professor_id이 있는지 확인 후 upsert
    // type이 "Employee"를 포함하는 경우 Employee table에서 해당 email이 있는지 확인 후 upsert
    // employee_t에서 해당 employee_id이 있는지 확인 후 upsert
    // if (type === "Professor") {
    // type을 teacher대신 professor 로 변경하면 좋을듯 합니다.

    // }

    return result;
  }

  async findUserById(id: number): Promise<{
    id: number;
    sid: string;
    name: string;
    email: string;
    undergraduate?: {
      id: number;
      number: number;
    };
    master?: {
      id: number;
      number: number;
    };
    doctor?: {
      id: number;
      number: number;
    };
    executive?: {
      id: number;
      studentId: number;
    };
    professor?: {
      id: number;
      email: string;
    };
    employee?: {
      id: number;
      email: string;
    };
  }> {
    const user = await this.db
      .select()
      .from(User)
      .where(eq(User.id, id))
      .then(takeUnique);

    const result: {
      id: number;
      sid: string;
      name: string;
      email: string;
      undergraduate?: {
        id: number;
        number: number;
      };
      master?: {
        id: number;
        number: number;
      };
      doctor?: {
        id: number;
        number: number;
      };
      executive?: {
        id: number;
        studentId: number;
      };
      professor?: {
        id: number;
        email: string;
      };
      employee?: {
        id: number;
        email: string;
      };
    } = {
      id: user.id,
      sid: user.sid,
      name: user.name,
      email: user.email,
    };

    const students = this.db
      .select()
      .from(Student)
      .where(eq(Student.userId, id));

    // eslint-disable-next-line no-restricted-syntax, @typescript-eslint/no-shadow
    for (const student of await students) {
      let studentEnum = 3;
      if (student.number % 10000 < 2000) studentEnum = 1;
      else if (student.number % 10000 < 6000) studentEnum = 2;
      else if (student.number % 10000 < 7000) studentEnum = 1;

      if (studentEnum === 1) {
        result.undergraduate = { id: student.id, number: student.number };
      } else if (studentEnum === 2) {
        result.master = { id: student.id, number: student.number };
      } else if (studentEnum === 3) {
        result.doctor = { id: student.id, number: student.number };
      }
    }

    const executive = await this.db
      .select()
      .from(Executive)
      .where(eq(Executive.userId, id))
      .then(takeUnique);

    if (executive) {
      result.executive = {
        id: executive.id,
        studentId: executive.studentId,
      };
    }

    const professor = await this.db
      .select()
      .from(Professor)
      .where(eq(Professor.userId, id))
      .then(takeUnique);

    if (professor) {
      result.professor = {
        id: professor.id,
        email: professor.email,
      };
    }

    const employee = await this.db
      .select()
      .from(Employee)
      .where(eq(Employee.userId, id))
      .then(takeUnique);

    if (employee) {
      result.employee = {
        id: employee.id,
        email: employee.email,
      };
    }

    return result;
  }

  async findUserAndRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<boolean> {
    const result = await this.db
      .select()
      .from(User)
      .innerJoin(
        RefreshToken,
        and(
          eq(User.id, RefreshToken.userId),
          eq(RefreshToken.refreshToken, refreshToken),
        ),
      )
      .where(eq(User.id, userId));
    return result.length > 0;
  }

  async createRefreshTokenRecord(
    userId: number,
    refreshToken: string,
    expiresAt: Date,
  ): Promise<boolean> {
    return this.db.transaction(async tx => {
      const [result] = await this.db
        .insert(RefreshToken)
        .values({ userId, expiresAt, refreshToken });
      const { affectedRows } = result;
      if (affectedRows > 1) {
        await tx.rollback();
        return false;
      }
      return true;
    });
  }

  async deleteRefreshTokenRecord(
    userId: number,
    refreshToken: string,
  ): Promise<boolean> {
    return this.db.transaction(async tx => {
      const [result] = await this.db
        .delete(RefreshToken)
        .where(
          and(
            eq(RefreshToken.userId, userId),
            eq(RefreshToken.refreshToken, refreshToken),
          ),
        );
      const { affectedRows } = result;
      if (affectedRows > 1) {
        await tx.rollback();
        return false;
      }
      return true;
    });
  }
}
