import {
  mysqlTable,
  int,
  varchar,
  datetime,
  timestamp,
} from "drizzle-orm/mysql-core";

export const User = mysqlTable("user", {
  id: int("id").autoincrement().primaryKey(),
  sid: varchar("sid", { length: 255 }).unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phoneNumber: varchar("phone_number", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: datetime("updated_at"),
  deletedAt: datetime("deleted_at"),
});

export const Student = mysqlTable("student", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => User.id),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const StudentT = mysqlTable("student_t", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("student_id")
    .unique()
    .references(() => Student.id),
  studentEnum: int("student_enum").notNull(),
  studentStatusEnum: int("student_status_enum").notNull(),
  number: int("number").unique(),
  department: int("department"),
  semesterId: int("semester_id"),
  startTerm: datetime("start_term"),
  endTerm: datetime("end_term"),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const StudentStatusEnum = mysqlTable("student_status_enum", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const StudentEnum = mysqlTable("student_enum", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const Executive = mysqlTable("executive", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => User.id),
  studentId: int("student_id"),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const ExecutiveT = mysqlTable("executive_t", {
  id: int("id").autoincrement().primaryKey(),
  executiveId: int("executive_id")
    .unique()
    .references(() => Executive.id),
  executiveStatusEnum: int("executive_status_enum"),
  executiveBureauEnum: int("executive_bureau_enum"),
  startTerm: datetime("start_term"),
  endTerm: datetime("end_term"),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const ExecutiveStatusEnum = mysqlTable("executive_status_enum", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const ExecutiveBureauEnum = mysqlTable("executive_bureau_enum", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const Professor = mysqlTable("professor", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => User.id),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const ProfessorT = mysqlTable("professor_t", {
  id: int("id").autoincrement().primaryKey(),
  professorId: int("professor_id")
    .unique()
    .references(() => Professor.id),
  professorEnum: int("professor_enum"),
  department: int("department"),
  startTerm: datetime("start_term"),
  endTerm: datetime("end_term"),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const ProfessorEnum = mysqlTable("professor_enum", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const Employee = mysqlTable("employee", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => User.id),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const EmployeeT = mysqlTable("employee_t", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employee_id")
    .unique()
    .references(() => Employee.id),
  startTerm: datetime("start_term"),
  endTerm: datetime("end_term"),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
