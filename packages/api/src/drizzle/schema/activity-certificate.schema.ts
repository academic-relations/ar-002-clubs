import {
  mysqlTable,
  int,
  varchar,
  datetime,
  timestamp,
  date,
} from "drizzle-orm/mysql-core";

// ActivityCertificate table
export const ActivityCertificate = mysqlTable("activity_certificate", {
  id: int("id").autoincrement().primaryKey(),
  clubId: int("club_id").notNull(),
  studentId: int("student_id").notNull(),
  studentPhoneNumber: varchar("student_phone_number", { length: 30 }),
  activityCertificateStatusEnum: int(
    "activity_certificate_status_enum",
  ).notNull(),
  issueNumber: int("issue_number"),
  issuedAt: datetime("issued_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

// ActivityCertificateItem table
export const ActivityCertificateItem = mysqlTable("activity_certificate_item", {
  id: int("id").autoincrement().primaryKey(),
  activityCertificateId: int("activity_certificate_id").notNull(),
  order: int("order").notNull(),
  startMonth: date("start_month").notNull(),
  endMonth: date("end_month").notNull(),
  detail: varchar("detail", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

// ActivityCertificateStatusEnum table
export const ActivityCertificateStatusEnum = mysqlTable(
  "activity_certificate_status_enum",
  {
    id: int("id").autoincrement().primaryKey(),
    statusName: varchar("status_name", { length: 30 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at"),
    deletedAt: timestamp("deleted_at"),
  },
);
