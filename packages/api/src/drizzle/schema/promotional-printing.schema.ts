import {
  boolean,
  datetime,
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { Club } from "./club.schema";
import { Student } from "./user.schema";

export const PromotionalPrintingOrderStatusEnum = mysqlTable(
  "promotional_printing_order_status_enum",
  {
    id: int("id").autoincrement().primaryKey(),
    statusName: varchar("status_name", { length: 30 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
);

export const PromotionalPrintingSizeEnum = mysqlTable(
  "promotional_printing_size_enum",
  {
    id: int("id").autoincrement().primaryKey(),
    statusName: varchar("printing_size", { length: 30 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
);

// PromotionalPrintingOrder 테이블 정의
export const PromotionalPrintingOrder = mysqlTable(
  "promotional_printing_order",
  {
    id: int("id").autoincrement().primaryKey(),
    clubId: int("club_id")
      .notNull()
      .references(() => Club.id),
    studentId: int("student_id")
      .notNull()
      .references(() => Student.id),
    studentPhoneNumber: varchar("student_phone_number", { length: 30 }),
    promotionalPrintingOrderStatusEnum: int(
      "promotional_printing_order_status_enum",
    ).notNull(),
    // .references(() => PromotionalPrintingOrderStatusEnum.id),
    documentFileLink: text("document_file_link"),
    isColorPrint: boolean("is_color_print").default(true).notNull(),
    fitPrintSizeToPaper: boolean("fit_print_size_to_paper")
      .default(true)
      .notNull(),
    requireMarginChopping: boolean("require_margin_chopping")
      .default(false)
      .notNull(),
    desiredPickUpTime: datetime("desired_pick_up_time").notNull(),
    pickUpAt: datetime("pick_up_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    promotionalPrintingOrderStatusEnumIdFk: index(
      "pp_order_pp_order_status_enum_id_fk",
    ).on(table.promotionalPrintingOrderStatusEnum),
  }),
);

export const PromotionalPrintingOrderSize = mysqlTable(
  "promotional_printing_order_size",
  {
    id: int("id").autoincrement().primaryKey(),
    promotionalPrintingOrderId: int("promotional_printing_order_id").notNull(),
    // .references(() => PromotionalPrintingOrder.id),
    promotionalPrintingSizeEnumId: int(
      "promotional_printing_size_enum_id",
    ).notNull(),
    // .references(() => PromotionalPrintingSizeEnum.id),
    numberOfPrints: int("number_of_prints").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    promotionalPrintingOrderIdFk: index("pp_order_size_pp_order_id_fk").on(
      table.promotionalPrintingOrderId,
    ),
    promotionalPrintingSizeEnumIdFk: index(
      "pp_order_size_pp_size_enum_id_fk",
    ).on(table.promotionalPrintingSizeEnumId),
  }),
);
