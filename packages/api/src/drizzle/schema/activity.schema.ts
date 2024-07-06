import {
  boolean,
  datetime,
  foreignKey,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { Club, SemesterD } from "./club.schema";
import { Executive, Student } from "./user.schema";

export const ActivityTypeEnum = mysqlTable("activity_type_enum", {
  id: int("id").autoincrement().primaryKey().notNull(),
  typeName: varchar("type_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const ActivityStatusEnum = mysqlTable("activity_status_enum", {
  id: int("id").autoincrement().primaryKey().notNull(),
  statusName: varchar("status_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const ActivityDeadlineEnum = mysqlTable("activity_deadline_enum", {
  id: int("id").autoincrement().primaryKey().notNull(),
  statusName: varchar("status_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const Activity = mysqlTable(
  "activity",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    clubId: int("club_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    activityTypeEnumId: int("activity_type_enum_id").notNull(),
    semesterId: int("semester_id").notNull(),
    startTerm: datetime("start_term").notNull(),
    endTerm: datetime("end_term").notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    purpose: text("purpose").notNull(),
    detail: text("detail").notNull(),
    evidence: text("evidence").notNull(),
    activityStatusEnumId: int("activity_status_enum_id")
      .notNull()
      .references(() => ActivityStatusEnum.id),
    chargedExecutiveId: int("charged_executive_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    executiveForeignKey: foreignKey({
      name: "activity_charged_executive_id_fk",
      columns: [table.chargedExecutiveId],
      foreignColumns: [Executive.id],
    }),
  }),
);

export const ActivityParticipant = mysqlTable(
  "activity_participant",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    activityId: int("activity_id").notNull(),
    studentId: int("student_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    activityForeignKey: foreignKey({
      name: "activity_participant_activity_id_fk",
      columns: [table.activityId],
      foreignColumns: [Activity.id],
    }),
    studentForeignKey: foreignKey({
      name: "activity_participant_student_id_fk",
      columns: [table.studentId],
      foreignColumns: [Student.id],
    }),
  }),
);

export const ActivityEvidenceFile = mysqlTable(
  "activity_evidence_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    activityId: int("activity_id").notNull(),
    // TODO: 파일 업로드 완성되면 연결하기
    fileId: text("file_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    activityForeignKey: foreignKey({
      name: "activity_evidence_file_activity_id_fk",
      columns: [table.activityId],
      foreignColumns: [Activity.id],
    }),
  }),
);

export const ProfessorSignStatus = mysqlTable(
  "professor_sign_status",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    clubId: int("club_id").notNull(),
    semesterId: int("semester_id").notNull(),
    signed: boolean("signed").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    clubForeignKey: foreignKey({
      name: "professor_sign_status_club_id_fk",
      columns: [table.clubId],
      foreignColumns: [Club.id],
    }),
    semesterForeignKey: foreignKey({
      name: "professor_sign_status_semester_id_fk",
      columns: [table.semesterId],
      foreignColumns: [SemesterD.id],
    }),
  }),
);

export const ActivityDeadlineD = mysqlTable(
  "activity_deadline_d",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    deadlineEnumId: int("deadline_enum_id").notNull(),
    startDate: datetime("start_date").notNull(),
    endDate: datetime("end_date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    deadlineEnumForeignKey: foreignKey({
      name: "activity_deadline_d_deadline_enum_id_fk",
      columns: [table.deadlineEnumId],
      foreignColumns: [ActivityDeadlineEnum.id],
    }),
  }),
);

// TODO: 피드백 테이블 추가하기
