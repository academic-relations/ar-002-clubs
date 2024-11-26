import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { Club } from "./club.schema";
import { File } from "./file.schema";
import { Executive, Student } from "./user.schema";

// StorageApplicaiton table
export const StorageApplicaiton = mysqlTable("storage_application", {
  id: int("id").autoincrement().primaryKey(),
  clubId: int("club_id")
    .notNull()
    .references(() => Club.id),
  studentId: int("student_id")
    .notNull()
    .references(() => Student.id),
  studentPhoneNumber: varchar("student_phone_number", { length: 30 }).notNull(),
  numberOfBoxes: int("number_of_boxes").notNull(),
  numberOfNonStandardItems: int("number_of_non_standard_items").notNull(),
  desiredPickUpDate: timestamp("desired_pick_up_date").notNull(),
  PickUpDate: timestamp("pick_up_date"),
  desiredStartDate: timestamp("desired_start_date").notNull(),
  desiredEndDate: timestamp("desired_end_date").notNull(),
  status: varchar("status", { length: 30 }).notNull().default("apply"),
  isPickedUp: boolean("is_picked_up").notNull().default(false),
  contractId: int("contract_id")
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    .references(() => StorageContract.id),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// StorageContract table
export const StorageContract = mysqlTable("storage_contract", {
  id: int("id").autoincrement().primaryKey(),
  endDate: timestamp("end_date"),
  numberOfBoxes: int("number_of_boxes").notNull(),
  numberOfNonStandardItems: int("number_of_non_standard_items").notNull(),
  charge: int("charge").notNull(),
  zone: varchar("zone", { length: 255 }),
  studentId: int("student_id")
    .notNull()
    .references(() => Student.id),
  executiveId: int("executive_id")
    .notNull()
    .references(() => Executive.id),
  applicationId: int("application_id")
    .notNull()
    .references(() => StorageApplicaiton.id),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// StorageBox table
export const StorageBox = mysqlTable("Storage_box", {
  id: int("id").autoincrement().primaryKey(),
  contractId: int("contract_id")
    .notNull()
    .references(() => StorageContract.id),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// StorageNonStandard table
export const StorageNonStandard = mysqlTable("Storage_non_standard", {
  id: int("id").autoincrement().primaryKey(),
  applicationId: int("application_id")
    .notNull()
    .references(() => StorageApplicaiton.id),
  name: varchar("name", { length: 30 }),
  fileId: varchar("file_id", { length: 128 }).references(() => File.id),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});