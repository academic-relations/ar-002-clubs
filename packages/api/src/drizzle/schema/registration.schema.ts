import {
  date,
  foreignKey,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { Club } from "./club.schema";
import { Division } from "./division.schema";
import { Professor, Student } from "./user.schema";

export const RegistrationTypeEnum = mysqlTable("registration_type_enum", {
  enumId: int("enum_id").autoincrement().primaryKey(),
  enumName: varchar("enum_name", { length: 30 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const RegistrationStatusEnum = mysqlTable("registration_status_enum", {
  enumId: int("enum_id").autoincrement().primaryKey(),
  enumName: varchar("enum_name", { length: 30 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const RegistrationActivityPlanFile = mysqlTable(
  "registration_activity_plan_file",
  {
    id: int("id").autoincrement().primaryKey(),
    fileUid: varchar("file_id", { length: 128 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
);

// Registration 테이블 정의
export const Registration = mysqlTable(
  "registration",
  {
    id: int("id").autoincrement().primaryKey(),
    clubId: int("club_id").references(() => Club.id),
    registrationApplicationTypeEnumId: int(
      "registration_application_type_enum_id",
    ).notNull(),
    // .references(() => RegistrationTypeEnum.enumId),
    registrationApplicationStatusEnumId: int(
      "registration_application_status_enum_id",
    ).notNull(),
    // .references(() => RegistrationStatusEnum.enumId),
    clubNameKr: varchar("club_name_kr", { length: 255 }),
    clubNameEn: varchar("club_name_en", { length: 255 }),
    studentId: int("student_id")
      .notNull()
      .references(() => Student.id),
    studentPhoneNumber: varchar("student_phone_number", { length: 30 }),
    foundedAt: timestamp("founded_at").notNull(),
    divisionId: int("division_id")
      .notNull()
      .references(() => Division.id),
    activityFieldKr: varchar("activity_field_kr", { length: 255 }),
    activityFieldEn: varchar("activity_field_en", { length: 255 }),
    professorId: int("professor_id").references(() => Professor.id),
    divisionConsistency: varchar("division_consistency", { length: 255 }),
    foundationPurpose: varchar("foundation_purpose", { length: 500 }),
    activityPlan: int("activity_plan")
      .notNull()
      .references(() => RegistrationActivityPlanFile.id),
    professorApprovedAt: timestamp("professor_approved_at"),
    reviewedAt: timestamp("reviewed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    registrationApplicationTypeEnumIdFk: foreignKey({
      name: "registration_type_enum_id_fk",
      columns: [table.registrationApplicationTypeEnumId],
      foreignColumns: [RegistrationTypeEnum.enumId],
    }),
    registrationApplicationStatusEnumIdFk: foreignKey({
      name: "registration_status_enum_id_fk",
      columns: [table.registrationApplicationStatusEnumId],
      foreignColumns: [RegistrationStatusEnum.enumId],
    }),
  }),
);

export const RegistrationClubRuleFile = mysqlTable(
  "registration_club_rule_file",
  {
    id: int("id").autoincrement().primaryKey(),
    registrationId: int("registration_id").notNull(),
    // .references(() => Registration.id),
    fileUid: varchar("file_id", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    registrationIdFk: foreignKey({
      name: "registration_id_fk",
      columns: [table.registrationId],
      foreignColumns: [Registration.id],
    }),
  }),
);

export const RegistrationExternalInstructionFile = mysqlTable(
  "registration_external_instruction_file",
  {
    id: int("id").autoincrement().primaryKey(),
    registrationId: int("registration_id").notNull(),
    // .references(() => Registration.id),
    fileUid: varchar("file_id", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    registrationIdFk: foreignKey({
      name: "registration_id_fk",
      columns: [table.registrationId],
      foreignColumns: [Registration.id],
    }),
  }),
);
export const RegistrationApplicationStudentStatusEnum = mysqlTable(
  "registration_application_student_status_enum",
  {
    enumId: int("enum_id").autoincrement().primaryKey(),
    enumName: varchar("enum_name", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
);

export const RegistrationApplicationStudent = mysqlTable(
  "registration_application_student",
  {
    id: int("id").autoincrement().primaryKey(),
    studentId: int("student_id")
      .notNull()
      .references(() => Student.id),
    clubId: int("club_id")
      .notNull()
      .references(() => Club.id),
    registrationApplicationStudentEnumId: int(
      "registration_application_student_student_status_enum",
    ).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    registrationStudentStatusEnumFk: foreignKey({
      columns: [table.registrationApplicationStudentEnumId],
      foreignColumns: [RegistrationApplicationStudentStatusEnum.enumId],
      name: "registration_application_student_enum_id_fk",
    }),
  }),
);

export const RegistrationDeadlineEnum = mysqlTable(
  "registration_deadline_enum",
  {
    enumId: int("enum_id").autoincrement().primaryKey(),
    enumName: varchar("enum_name", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
);

export const RegistrationDeadlineD = mysqlTable(
  "registration_deadline_d",
  {
    id: int("id").autoincrement().primaryKey(),
    registrationDeadlineEnumId: int("registration_deadline_enum_id").notNull(),
    startDate: date("start_date"),
    endDate: date("end_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    registrationEventEnumIdFk: foreignKey({
      columns: [table.registrationDeadlineEnumId],
      foreignColumns: [RegistrationDeadlineEnum.enumId],
      name: "registration_deadline_d_registration_deadline_enum_id_fk",
    }),
  }),
);
