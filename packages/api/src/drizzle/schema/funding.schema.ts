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

import { Activity } from "./activity.schema";
import { Club, SemesterD } from "./club.schema";
import { ExecutiveT, StudentT } from "./user.schema";

export const FixtureEvidenceEnum = mysqlTable("fixture_evidence_enum", {
  id: int("id").autoincrement().primaryKey().notNull(),
  fixtureEvidenceName: varchar("fixture_evidence_name", {
    length: 255,
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const FixtureClassEnum = mysqlTable("fixture_class_enum", {
  id: int("id").autoincrement().primaryKey().notNull(),
  fixtureClassName: varchar("fixture_class_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const TransportationEnum = mysqlTable("transportation_enum", {
  id: int("id").autoincrement().primaryKey().notNull(),
  transportationName: varchar("transportation_name", {
    length: 255,
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const FundingOrderStatusEnum = mysqlTable("funding_order_status_enum", {
  id: int("id").autoincrement().primaryKey().notNull(),
  statusName: varchar("status_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const FundingOrder = mysqlTable(
  "funding_order",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    clubId: int("club_id").notNull(),
    semesterId: int("semester_id").notNull(),
    fundingOrderStatusEnumId: int("funding_order_status_enum_id").notNull(),
    purposeId: int("purpose_id"),
    name: varchar("name", { length: 255 }).notNull(),
    expenditureDate: datetime("expenditure_date").notNull(),
    expenditureAmount: int("expenditure_amount").notNull(),
    approvedAmount: int("approved_amount"),
    tradeDetailExplanation: text("trade_detail_explanation"),
    clubSuppliesName: varchar("club_supplies_name", { length: 255 }),
    clubSuppliesEvidenceEnumId: int("club_supplies_evidence_enum_id"),
    clubSuppliesClassEnumId: int("club_supplies_class_enum_id"),
    clubSuppliesPurpose: text("club_supplies_purpose"),
    clubSuppliesSoftwareEvidence: text("club_supplies_software_evidence"),
    numberOfClubSupplies: int("number_of_club_supplies"),
    priceOfClubSupplies: int("price_of_club_supplies"),
    isFixture: boolean("is_fixture"),
    fixtureName: varchar("fixture_name", { length: 255 }),
    fixtureEvidenceEnumId: int("fixture_evidence_enum_id"),
    fixtureClassEnumId: int("fixture_class_enum_id"),
    fixturePurpose: text("fixture_purpose"),
    fixtureSoftwareEvidence: text("fixture_software_evidence"),
    numberOfFixture: int("number_of_fixture"),
    priceOfFixture: int("price_of_fixture"),
    isTransportation: boolean("is_transportation").notNull(),
    transportationEnumId: int("transportation_enum_id").references(
      () => TransportationEnum.id,
    ),
    origin: varchar("origin", { length: 255 }),
    destination: varchar("destination", { length: 255 }),
    purposeOfTransportation: text("purpose_of_transportation"),
    placeValidity: text("place_validity"),
    isNonCorporateTransaction: boolean(
      "is_non_corporate_transaction",
    ).notNull(),
    traderName: varchar("trader_name", { length: 255 }),
    traderAccountNumber: varchar("trader_account_number", { length: 255 }),
    wasteExplanation: text("waste_explanation"),
    isFoodExpense: boolean("is_food_expense").notNull(),
    foodExpenseExplanation: text("food_expense_explanation"),
    isLaborContract: boolean("is_labor_contract").notNull(),
    laborContractExplanation: text("labor_contract_explanation"),
    isExternalEventParticipationFee: boolean(
      "is_external_event_participation_fee",
    ).notNull(),
    externalEventParticipationFeeExplanation: text(
      "external_event_participation_fee_explanation",
    ),
    isPublication: boolean("is_publication").notNull(),
    publicationExplanation: text("publication_explanation"),
    isProfitMakingActivity: boolean("is_profit_making_activity").notNull(),
    profitMakingActivityExplanation: text("profit_making_activity_explanation"),
    isJointExpense: boolean("is_joint_expense").notNull(),
    jointExpenseExplanation: text("joint_expense_explanation"),
    isEtcExpense: boolean("is_etc_expense").notNull(),
    etcExpenseExplanation: text("etc_expense_explanation"),
    chargedExecutiveId: int("charged_executive_id"),
    isCommitee: boolean("is_commitee").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    statusForeignKey: foreignKey({
      name: "funding_order_status_enum_id_fk",
      columns: [table.fundingOrderStatusEnumId],
      foreignColumns: [FundingOrderStatusEnum.id],
    }),
    clubForeignKey: foreignKey({
      name: "funding_order_club_id_fk",
      columns: [table.clubId],
      foreignColumns: [Club.id],
    }),
    semesterForeignKey: foreignKey({
      name: "funding_order_semester_id_fk",
      columns: [table.semesterId],
      foreignColumns: [SemesterD.id],
    }),
    purposeForeignKey: foreignKey({
      name: "funding_order_purpose_id_fk",
      columns: [table.purposeId],
      foreignColumns: [Activity.id],
    }),
    executiveForeignKey: foreignKey({
      name: "funding_order_charged_executive_id_fk",
      columns: [table.chargedExecutiveId],
      foreignColumns: [ExecutiveT.id],
    }),
    clubSuppliesEvidenceEnumForeignKey: foreignKey({
      name: "funding_order_club_supplies_evidence_enum_id_fk",
      columns: [table.clubSuppliesEvidenceEnumId],
      foreignColumns: [FixtureEvidenceEnum.id],
    }),
    clubSuppliesClassEnumForeignKey: foreignKey({
      name: "funding_order_club_supplies_class_enum_id_fk",
      columns: [table.clubSuppliesClassEnumId],
      foreignColumns: [FixtureClassEnum.id],
    }),
    fixtureEvidenceEnumForeignKey: foreignKey({
      name: "funding_order_fixture_evidence_enum_id_fk",
      columns: [table.fixtureEvidenceEnumId],
      foreignColumns: [FixtureEvidenceEnum.id],
    }),
    fixtureClassEnumForeignKey: foreignKey({
      name: "funding_order_fixture_class_enum_id_fk",
      columns: [table.fixtureClassEnumId],
      foreignColumns: [FixtureClassEnum.id],
    }),
    FixtureTransportationEnumForeignKey: foreignKey({
      name: "funding_order_transportation_enum_id_fk",
      columns: [table.transportationEnumId],
      foreignColumns: [TransportationEnum.id],
    }),
  }),
);

export const TradeEvidenceFile = mysqlTable(
  "trade_evidence_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    fileId: varchar("file_id", { length: 128 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "trade_evidence_file_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
  }),
);

export const TradeDetailFile = mysqlTable(
  "trade_detail_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    fileId: varchar("file_id", { length: 128 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "trade_detail_file_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
  }),
);

export const FoodExpenseFile = mysqlTable(
  "food_expense_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    fileId: varchar("file_id", { length: 128 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "food_expense_file_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
  }),
);

export const LaborContractFile = mysqlTable(
  "labor_contract_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    fileId: varchar("file_id", { length: 128 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "labor_contract_file_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
  }),
);

export const ExternalEventParticipationFeeFile = mysqlTable(
  "external_event_participation_fee_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    fileId: varchar("file_id", { length: 128 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "external_event_participation_fee_file_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
  }),
);

export const PublicationFile = mysqlTable(
  "publication_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    fileId: varchar("file_id", { length: 128 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "publication_file_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
  }),
);

export const ProfitMakingActivityFile = mysqlTable(
  "profit_making_activity_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    fileId: varchar("file_id", { length: 128 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "profit_making_activity_file_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
  }),
);

export const JointExpenseFile = mysqlTable(
  "joint_expense_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    fileId: varchar("file_id", { length: 128 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "joint_expense_file_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
  }),
);

export const EtcExpenseFile = mysqlTable(
  "etc_expense_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    fileId: varchar("file_id", { length: 128 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "etc_expense_file_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
  }),
);

export const ClubSuppliesImageFile = mysqlTable(
  "club_supplies_image_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    fileId: varchar("file_id", { length: 128 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "club_supplies_image_file_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
  }),
);

export const FixtureImageFile = mysqlTable(
  "fixture_image_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    fileId: varchar("file_id", { length: 128 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "fixture_image_file_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
  }),
);

export const ClubSuppliesSoftwareEvidenceFile = mysqlTable(
  "club_supplies_software_evidence_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    fileId: varchar("file_id", { length: 128 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "club_supplies_software_evidence_file_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
  }),
);

export const FixtureSoftwareEvidenceFile = mysqlTable(
  "fixture_software_evidence_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    fileId: varchar("file_id", { length: 128 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "fixture_software_evidence_file_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
  }),
);

export const TransportationPassenger = mysqlTable(
  "transportation_passenger",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    studentId: int("student_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "transportation_passenger_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
    studentTForeignKey: foreignKey({
      name: "transportation_passenger_student_id_fk",
      columns: [table.studentId],
      foreignColumns: [StudentT.id],
    }),
  }),
);

export const FundingOrderFeedback = mysqlTable(
  "funding_order_feedback",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    fundingOrderId: int("funding_order_id").notNull(),
    chargedExecutiveId: int("charged_executive_id").notNull(),
    feedback: text("feedback").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fundingOrderForeignKey: foreignKey({
      name: "funding_order_feedback_funding_order_id_fk",
      columns: [table.fundingOrderId],
      foreignColumns: [FundingOrder.id],
    }),
    executiveForeignKey: foreignKey({
      name: "funding_order_feedback_executive_id_fk",
      columns: [table.chargedExecutiveId],
      foreignColumns: [ExecutiveT.id],
    }),
  }),
);

export const FundingDeadlineEnum = mysqlTable("funding_deadline_enum", {
  id: int("id").autoincrement().primaryKey().notNull(),
  statusName: varchar("status_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const FundingDeadlineD = mysqlTable(
  "funding_deadline_d",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    deadlineEnumId: int("deadline_enum_id").notNull(),
    startDate: datetime("start_date").notNull(),
    endDate: datetime("end_date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    deadlineEnumForeignKey: foreignKey({
      name: "funding_deadline_d_deadline_enum_id_fk",
      columns: [table.deadlineEnumId],
      foreignColumns: [FundingDeadlineEnum.id],
    }),
  }),
);
