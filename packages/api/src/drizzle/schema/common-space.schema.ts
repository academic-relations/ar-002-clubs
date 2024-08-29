import {
  datetime,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { Club } from "./club.schema";
import { Student } from "./user.schema";

export const CommonSpaceEnum = mysqlTable("common_space_enum", {
  id: int("id").autoincrement().primaryKey(),
  typeName: varchar("type_name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deleteAt: timestamp("deleted_at"),
});

export const CommonSpace = mysqlTable("common_space", {
  id: int("id").autoincrement().primaryKey(),
  commonSpaceEnum: int("common_space_enum")
    .notNull()
    .references(() => CommonSpaceEnum.id),
  availableHoursPerWeek: int("available_hours_per_week").notNull(),
  availableHoursPerDay: int("available_hours_per_day").notNull(),
  spaceName: varchar("space_name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deleteAt: timestamp("deleted_at"),
});

export const CommonSpaceUsageOrderD = mysqlTable("common_space_usage_order_d", {
  id: int("id").autoincrement().primaryKey(),
  commonSpaceId: int("common_space_id")
    .notNull()
    .references(() => CommonSpace.id),
  clubId: int("club_id")
    .notNull()
    .references(() => Club.id),
  chargeStudentId: int("charge_student_id")
    .notNull()
    .references(() => Student.id),
  studentPhoneNumber: varchar("student_phone_number", { length: 30 }).notNull(),
  startTerm: datetime("start_term").notNull(),
  endTerm: datetime("end_term").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});
