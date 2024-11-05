import {
  boolean,
  datetime,
  // foreignKey,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { Club } from "./club.schema";
import { Division } from "./division.schema";
import { User } from "./user.schema";

export const MeetingRoleEnum = mysqlTable("meeting_role_enum", {
  id: int("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingAnnouncement = mysqlTable("meeting_announcement", {
  id: int("id").autoincrement().primaryKey(),
  announcementTitle: varchar("title", { length: 255 }).notNull(),
  announcementContent: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const Meeting = mysqlTable("meeting", {
  id: int("id").autoincrement().primaryKey(),
  announcementId: int("meeting_announcement_id").references(
    () => MeetingAnnouncement.id,
  ),
  meetingEnumId: int("meeting_type_enum").notNull(),
  isRegular: boolean("is_regular_meeting").notNull(),
  location: varchar("location_kr", { length: 255 }),
  locationEn: varchar("location_en", { length: 255 }),
  startDate: datetime("start_datetime").notNull(),
  endDate: datetime("end_datetime"),
  tag: varchar("meeting_group_tag", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingAgenda = mysqlTable("meeting_agenda", {
  id: int("id").autoincrement().primaryKey(),
  MeetingAgendaEnum: int("enum").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  isEditableDivisionPresident: boolean(
    "is_editable_divisionPresident",
  ).notNull(),
  isEditableRepresentative: boolean("is_editable_representative").notNull(),
  isEditableSelf: boolean("is_editable_self").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingAgendaContent = mysqlTable("meeting_agenda_content", {
  id: int("id").autoincrement().primaryKey(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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
  createdAt: timestamp("created_at").defaultNow().notNull(),
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
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingAgendaVote = mysqlTable("meeting_agenda_vote", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingVoteChoice = mysqlTable("meeting_vote_choice", {
  id: int("id").autoincrement().primaryKey(),
  voteId: int("vote_id")
    .references(() => MeetingAgendaVote.id)
    .notNull(),
  choice: varchar("choice", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingVoteResult = mysqlTable("meeting_vote_result", {
  id: int("id").autoincrement().primaryKey(),
  voteId: int("vote_id")
    .references(() => MeetingAgendaVote.id)
    .notNull(),
  userId: int("user_id")
    .references(() => User.id)
    .notNull(),
  choiceId: int("choice_id")
    .references(() => MeetingVoteChoice.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

export const MeetingMapping = mysqlTable("meeting_mapping", {
  id: int("id").autoincrement().primaryKey(),
  meetingId: int("meeting_id")
    .references(() => Meeting.id)
    .notNull(),
  meetingAgendaId: int("meeting_agenda_id")
    .references(() => MeetingAgenda.id)
    .notNull(),
  meetingAgendaPosition: int("meeting_agenda_position").autoincrement(),
  meetingAgendaEntityType: int("meeting_agenda_entity_type").notNull(),
  meetingAgendaContentId: int("meeting_agenda_content_id").references(
    () => MeetingAgendaContent.id,
  ),
  meetingAgendaVoteId: int("meeting_agenda_vote_id").references(
    () => MeetingAgendaVote.id,
  ),
  meetingAgendaEntityPosition: int(
    "meeting_agenda_entity_position",
  ).autoincrement(),
});
