import {
  datetime,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

// RentalOrder table
export const RentalOrder = mysqlTable("rental_order", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("student_id").notNull(),
  studentPhoneNumber: varchar("student_phone_number", { length: 30 }),
  clubId: int("club_id").notNull(),
  purpose: text("purpose"),
  desiredStart: datetime("desired_start"),
  desiredEnd: datetime("desired_end"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

// RentalEnum table
export const RentalEnum = mysqlTable("rental_enum", {
  id: int("id").autoincrement().primaryKey(),
  typeName: varchar("type_name", { length: 30 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

// RentalObject table
export const RentalObject = mysqlTable("rental_object", {
  id: int("id").autoincrement().primaryKey(),
  rentalEnum: int("rental_enum")
    .notNull()
    .references(() => RentalEnum.id),
  objectName: varchar("object_name", { length: 30 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});

// RentalOrderItemD table
export const RentalOrderItemD = mysqlTable("rental_order_item_d", {
  id: int("id").autoincrement().primaryKey(),
  rentalOrderId: int("rental_order_id")
    .notNull()
    .references(() => RentalOrder.id),
  objectId: int("object_id")
    .notNull()
    .references(() => RentalObject.id),
  startTerm: datetime("start_term"),
  endTerm: datetime("end_term"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});
