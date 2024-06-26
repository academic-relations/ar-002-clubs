import {
  date,
  datetime,
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

// eslint-disable-next-line import/no-cycle
import { Division } from "./division.schema";
import { Professor, Student } from "./user.schema";

export const Club = mysqlTable("club", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 30 }).unique(),
  divisionId: int("division_id")
    .notNull()
    .references(() => Division.id),
  description: text("description"),
  foundingYear: int("founding_year").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const ClubStatusEnum = mysqlTable("club_status_enum", {
  id: int("id").autoincrement().primaryKey(),
  statusName: varchar("status_name", { length: 30 }),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const SemesterD = mysqlTable("semester_d", {
  id: int("id").autoincrement().primaryKey(),
  year: int("year"),
  name: varchar("name", { length: 10 }),
  startTerm: date("start_term"),
  endTerm: date("end_term"),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const ClubT = mysqlTable("club_t", {
  id: int("id").autoincrement().primaryKey(),
  clubId: int("club_id")
    .notNull()
    .references(() => Club.id),
  clubStatusEnumId: int("club_status_enum_id")
    .notNull()
    .references(() => ClubStatusEnum.id),
  characteristicKr: varchar("characteristic_kr", { length: 50 }),
  characteristicEn: varchar("characteristic_en", { length: 50 }),
  professorId: int("professor_id").references(() => Professor.id),
  semesterId: int("semester_id")
    .notNull()
    .references(() => SemesterD.id),
  startTerm: date("start_term").notNull(),
  endTerm: date("end_term"),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const ClubStudentT = mysqlTable("club_student_t", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("student_id")
    .notNull()
    .references(() => Student.id),
  clubId: int("club_id")
    .notNull()
    .references(() => Club.id),
  semesterId: int("semester_id")
    .notNull()
    .references(() => SemesterD.id),
  startTerm: date("start_term").notNull(),
  endTerm: date("end_term"),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const ClubBuildingEnum = mysqlTable("club_building_enum", {
  id: int("id").autoincrement().primaryKey(),
  buildingName: varchar("building_name", { length: 30 }),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const ClubRoomT = mysqlTable("club_room_t", {
  id: int("id").autoincrement().primaryKey(),
  clubId: int("club_id")
    .notNull()
    .references(() => Club.id),
  clubBuildingEnum: int("club_building_enum")
    .notNull()
    .references(() => ClubBuildingEnum.id),
  roomLocation: varchar("room_location", { length: 20 }),
  roomPassword: varchar("room_password", { length: 20 }),
  semesterId: int("semester_id")
    .notNull()
    .references(() => SemesterD.id),
  startTerm: date("start_term").notNull(),
  endTerm: date("end_term"),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const ClubRepresentativeEnum = mysqlTable("club_representative_enum", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("enum_name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const ClubRepresentativeD = mysqlTable(
  "club_representative_d",
  {
    id: int("id").autoincrement().primaryKey(),
    clubId: int("club_id")
      .notNull()
      .references(() => Club.id),
    studentId: int("student_id")
      .notNull()
      .references(() => Student.id),
    clubRepresentativeEnum: int("club_representative_enum").notNull(),
    // .references(() => ClubRepresentativeEnum.id),
    startTerm: datetime("start_term").notNull(),
    endTerm: datetime("end_term"),
    createdAt: timestamp("created_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  // references로 설정했을 때 MySQL의 바이트수 초과로 인해 생성이 불가능하여 명시적으로 FK 이름을 지정해야함
  table => ({
    clubRepresentativeEnumIdFk: index(
      "club_representative_d_club_representative_enum_id_fk",
    ).on(table.clubRepresentativeEnum),
  }),
);
