import {
  date,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

// eslint-disable-next-line import/no-cycle
import { Club } from "./club.schema";
import { Student } from "./user.schema";

export const District = mysqlTable("district", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 10 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const Division = mysqlTable("division", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 10 }).notNull(),
  districtId: int("district_id")
    .notNull()
    .references(() => District.id),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const DivisionPresidentD = mysqlTable("division_president_d", {
  id: int("id").autoincrement().primaryKey(),
  divisionId: int("division_id")
    .notNull()
    .references(() => Division.id),
  studentId: int("student_id")
    .notNull()
    .references(() => Student.id),
  startTerm: date("start_term").notNull(),
  endTerm: date("end_term"),
  originatedClubId: int("originated_club_id")
    .notNull()
    .references(() => Club.id), // Assuming Club table exists
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const DivisionPermanentClubD = mysqlTable("division_permanent_club_d", {
  id: int("id").autoincrement().primaryKey(),
  clubId: int("club_id")
    .unique()
    .notNull()
    .references(() => Club.id), // Assuming Club table exists
  startTerm: date("start_term").notNull(),
  endTerm: date("end_term"),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
