import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
// import { eq } from "drizzle-orm";
// import {
//   Club,
//   ClubT,
//   ClubStatusEnum,
//   clubRepresentativeD,
//   SemesterD,
// } from "src/drizzle/schema/club.schema";
// import { Student, User } from "src/drizzle/schema/user.schema";

@Injectable()
export class ClubRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  // async findAllClubsBySemester(studentId: number) {
  //   const semesters = await this.db
  //     .select({
  //       semesterId: SemesterD.id,
  //       semesterName: SemesterD.name,
  //       clubId: Club.id,
  //       clubName: Club.name,
  //       clubStatus: ClubStatusEnum.statusName,
  //       characteristic: ClubT.characteristicKr,
  //       representativeName: User.name,
  //       advisorName: User.name,
  //       // totalMembers: "COUNT(DISTINCT Student.id)", // Example of how you might calculate members, adjust as necessary
  //     })
  //     .from(SemesterD)
  //     .leftJoin(ClubT, eq(ClubT.semesterId, SemesterD.id))
  //     .leftJoin(Club, eq(Club.id, ClubT.id))
  //     .leftJoin(ClubStatusEnum, eq(ClubStatusEnum.id, ClubT.clubStatusEnumId))
  //     .leftJoin(clubRepresentativeD, eq(clubRepresentativeD.clubId, Club.id))
  //     .leftJoin(Student, eq(Student.id, clubRepresentativeD.studentId))
  //     .leftJoin(User, eq(User.id, Student.userId))
  //     .groupBy(SemesterD.id, Club.id)
  //     .execute();

  //   return semesters.map(semester => ({
  //     id: semester.semesterId,
  //     name: semester.semesterName,
  //     clubs: semesters
  //       .filter(s => s.semesterId === semester.semesterId)
  //       .map(club => ({
  //         id: club.clubId,
  //         name: club.clubName,
  //         type: club.clubStatus,
  //         // Include the following line if 'isPermanent' exists in your schema
  //         isPermanent: false,
  //         characteristic: club.characteristic,
  //         representative: club.representativeName,
  //         advisor: club.advisorName,
  //         // totalMembers: club.totalMembers,
  //       })),
  //   }));
  // }
}
