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

import { Club } from "./club.schema";
import { Division } from "./division.schema";
import { User } from "./user.schema";

export const MeetingAgendaEnum = mysqlTable("meeting_agenda_enum", {
  id: int("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingEnum = mysqlTable("meeting_enum", {
  id: int("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingRoleEnum = mysqlTable("meeting_role_enum", {
  id: int("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingAnnouncement = mysqlTable("meeting_announcement", {
  id: int("id").autoincrement().primaryKey(),
  announcementTitle: varchar("announcement_title", { length: 255 }).notNull(),
  announcementContent: text("announcement_content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const Meeting = mysqlTable(
  "meeting",
  {
    id: int("id").autoincrement().primaryKey(),
    announcementId: int("announcement_id")
      .references(() => MeetingAnnouncement.id)
      .notNull(),
    meetingEnumId: int("meeting_enum_id"),
    memo: text("memo"),
    isRegular: boolean("is_regular").notNull(),
    location: varchar("location", { length: 255 }),
    startDate: datetime("start_date").notNull(),
    endDate: datetime("end_date"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at"),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    meetingEnumForeignKey: foreignKey({
      name: "meeting_enum_foreign_key",
      columns: [table.meetingEnumId],
      foreignColumns: [MeetingEnum.id],
    }),
  }),
);

export const MeetingAgenda = mysqlTable(
  "meeting_agenda",
  {
    id: int("id").autoincrement().primaryKey(),
    meetingId: int("meeting_id")
      .references(() => Meeting.id)
      .notNull(),
    MeetingAgendaEnum: int("meeting_agenda_enum").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    createdBy: int("created_by").references(() => User.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at"),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    meetingAgendaEnumForeignKey: foreignKey({
      name: "meeting_agenda_enum_foreign_key",
      columns: [table.MeetingAgendaEnum],
      foreignColumns: [MeetingAgendaEnum.id],
    }),
  }),
);

export const MeetingAgendaContent = mysqlTable("meeting_agenda_content", {
  id: int("id").autoincrement().primaryKey(),
  agendaId: int("agenda_id")
    .references(() => MeetingAgenda.id)
    .notNull(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingAttendanceDay = mysqlTable("meeting_attendance_day", {
  id: int("id").autoincrement().primaryKey(),
  meetingId: int("meeting_id")
    .references(() => Meeting.id)
    .notNull(),
  meetingRoleEnum: int("meeting_role_enum")
    .references(() => MeetingRoleEnum.id)
    .notNull(),
  whichClubId: int("which_club_id").references(() => Club.id),
  whichDivisionId: int("which_division_id").references(() => Division.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingAttendanceTimeT = mysqlTable("meeting_attendance_time_t", {
  id: int("id").autoincrement().primaryKey(),
  meetingId: int("meeting_id")
    .references(() => Meeting.id)
    .notNull(),
  userId: int("user_id")
    .references(() => User.id)
    .notNull(),
  startTerm: datetime("start_term").notNull(),
  endTerm: datetime("end_term"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingAgendaVote = mysqlTable("meeting_agenda_vote", {
  id: int("id").autoincrement().primaryKey(),
  agendaId: int("agenda_id")
    .references(() => MeetingAgenda.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingVoteChoice = mysqlTable("meeting_vote_choice", {
  id: int("id").autoincrement().primaryKey(),
  voteId: int("vote_id")
    .references(() => MeetingAgendaVote.id)
    .notNull(),
  choice: text("choice").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingVoteResult = mysqlTable("meeting_vote_result", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id")
    .references(() => User.id)
    .notNull(),
  choiceId: int("choice_id")
    .references(() => MeetingVoteChoice.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});
