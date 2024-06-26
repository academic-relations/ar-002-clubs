import {
  date,
  datetime,
  index,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { Club } from "./club.schema";
import { Student } from "./user.schema";

// ActivityCertificateStatusEnum table
export const ActivityCertificateStatusEnum = mysqlTable(
  "activity_certificate_status_enum",
  {
    id: int("id").autoincrement().primaryKey(),
    statusName: varchar("status_name", { length: 30 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
);

// ActivityCertificate table
export const ActivityCertificate = mysqlTable(
  "activity_certificate",
  {
    id: int("id").autoincrement().primaryKey(),
    clubId: int("club_id")
      .notNull()
      .references(() => Club.id),
    studentId: int("student_id")
      .notNull()
      .references(() => Student.id),
    studentPhoneNumber: varchar("student_phone_number", { length: 30 }),
    activityCertificateStatusEnum: int(
      "activity_certificate_status_enum",
    ).notNull(),
    // .references(() => ActivityCertificateStatusEnum.id),
    issueNumber: int("issue_number"),
    issuedAt: datetime("issued_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at"),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    activityCertificateStatusEnumIdFk: index(
      "activity_certificate_d_activity_certificate_enum_id_fk",
    ).on(table.activityCertificateStatusEnum),
  }),
);

// ActivityCertificateItem table
export const ActivityCertificateItem = mysqlTable(
  "activity_certificate_item",
  {
    id: int("id").autoincrement().primaryKey(),
    activityCertificateId: int("activity_certificate_id").notNull(),
    // .references(() => ActivityCertificate.id),
    order: int("order").notNull(),
    startMonth: date("start_month").notNull(),
    endMonth: date("end_month").notNull(),
    detail: varchar("detail", { length: 100 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at"),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    activityCertificateIdEnumIdFk: index(
      "activity_certificate_id_d_activity_certificate_id_enum_id_fk",
    ).on(table.activityCertificateId),
  }),
);
