import { Inject, Injectable } from "@nestjs/common";

import {
  IFundingRequest,
  IFundingSummary,
} from "@sparcs-clubs/interface/api/funding/type/funding.type";
import { and, eq, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import {
  ClubSuppliesImageFile,
  ClubSuppliesSoftwareEvidenceFile,
  EtcExpenseFile,
  ExternalEventParticipationFeeFile,
  FixtureImageFile,
  FixtureSoftwareEvidenceFile,
  FoodExpenseFile,
  FundingOrder,
  FundingOrderFeedback,
  JointExpenseFile,
  LaborContractFile,
  ProfitMakingActivityFile,
  PublicationFile,
  TradeDetailFile,
  TradeEvidenceFile,
  TransportationPassenger,
} from "@sparcs-clubs/api/drizzle/schema/funding.schema";

import { Student } from "@sparcs-clubs/api/drizzle/schema/user.schema";

import { MFunding } from "../model/funding.model";

@Injectable()
export default class FundingRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async select(id: number): Promise<MFunding> {
    const result = await this.db
      .select({
        funding_order: FundingOrder,
        funding_order_feedback: FundingOrderFeedback,
      })
      .from(FundingOrder)
      .leftJoin(
        FundingOrderFeedback,
        eq(FundingOrderFeedback.fundingOrderId, id),
      )
      .where(and(eq(FundingOrder.id, id), isNull(FundingOrder.deletedAt)));

    if (result.length === 0) {
      return null;
    }

    const [
      tradeEvidenceFiles,
      tradeDetailFiles,
      clubSuppliesImageFiles,
      clubSuppliesSoftwareEvidenceFiles,
      fixtureImageFiles,
      fixtureSoftwareEvidenceFiles,
      foodExpenseFiles,
      laborContractFiles,
      externalEventParticipationFeeFiles,
      publicationFiles,
      profitMakingActivityFiles,
      jointExpenseFiles,
      etcExpenseFiles,
      transportationPassengers,
    ] = await Promise.all([
      this.db
        .select()
        .from(TradeEvidenceFile)
        .where(
          and(
            eq(TradeEvidenceFile.fundingOrderId, id),
            isNull(TradeEvidenceFile.deletedAt),
          ),
        ),
      this.db
        .select()
        .from(TradeDetailFile)
        .where(
          and(
            eq(TradeDetailFile.fundingOrderId, id),
            isNull(TradeDetailFile.deletedAt),
          ),
        ),
      this.db
        .select()
        .from(ClubSuppliesImageFile)
        .where(
          and(
            eq(ClubSuppliesImageFile.fundingOrderId, id),
            isNull(ClubSuppliesImageFile.deletedAt),
          ),
        ),
      this.db
        .select()
        .from(ClubSuppliesSoftwareEvidenceFile)
        .where(
          and(
            eq(ClubSuppliesSoftwareEvidenceFile.fundingOrderId, id),
            isNull(ClubSuppliesSoftwareEvidenceFile.deletedAt),
          ),
        ),
      this.db
        .select()
        .from(FixtureImageFile)
        .where(
          and(
            eq(FixtureImageFile.fundingOrderId, id),
            isNull(FixtureImageFile.deletedAt),
          ),
        ),
      this.db
        .select()
        .from(FixtureSoftwareEvidenceFile)
        .where(
          and(
            eq(FixtureSoftwareEvidenceFile.fundingOrderId, id),
            isNull(FixtureSoftwareEvidenceFile.deletedAt),
          ),
        ),
      this.db
        .select()
        .from(FoodExpenseFile)
        .where(
          and(
            eq(FoodExpenseFile.fundingOrderId, id),
            isNull(FoodExpenseFile.deletedAt),
          ),
        ),
      this.db
        .select()
        .from(LaborContractFile)
        .where(
          and(
            eq(LaborContractFile.fundingOrderId, id),
            isNull(LaborContractFile.deletedAt),
          ),
        ),
      this.db
        .select()
        .from(ExternalEventParticipationFeeFile)
        .where(
          and(
            eq(ExternalEventParticipationFeeFile.fundingOrderId, id),
            isNull(ExternalEventParticipationFeeFile.deletedAt),
          ),
        ),
      this.db
        .select()
        .from(PublicationFile)
        .where(
          and(
            eq(PublicationFile.fundingOrderId, id),
            isNull(PublicationFile.deletedAt),
          ),
        ),
      this.db
        .select()
        .from(ProfitMakingActivityFile)
        .where(
          and(
            eq(ProfitMakingActivityFile.fundingOrderId, id),
            isNull(ProfitMakingActivityFile.deletedAt),
          ),
        ),
      this.db
        .select()
        .from(JointExpenseFile)
        .where(
          and(
            eq(JointExpenseFile.fundingOrderId, id),
            isNull(JointExpenseFile.deletedAt),
          ),
        ),
      this.db
        .select()
        .from(EtcExpenseFile)
        .where(
          and(
            eq(EtcExpenseFile.fundingOrderId, id),
            isNull(EtcExpenseFile.deletedAt),
          ),
        ),
      this.db
        .select({
          fundingOrderId: TransportationPassenger.fundingOrderId,
          studentId: TransportationPassenger.studentId,
          studentNumber: Student.number,
          name: Student.name,
        })
        .from(TransportationPassenger)
        .where(and(isNull(TransportationPassenger.deletedAt)))
        .innerJoin(Student, eq(Student.id, TransportationPassenger.studentId)),
    ]);

    return MFunding.fromDBResult({
      fundingOrder: result[0].funding_order,
      fundingOrderFeedback: result[0].funding_order_feedback,
      tradeEvidenceFiles: tradeEvidenceFiles.map(file => ({
        id: file.fileId,
      })),
      tradeDetailFiles: tradeDetailFiles.map(file => ({
        id: file.fileId,
      })),
      clubSuppliesImageFiles: clubSuppliesImageFiles.map(file => ({
        id: file.fileId,
      })),
      clubSuppliesSoftwareEvidenceFiles: clubSuppliesSoftwareEvidenceFiles.map(
        file => ({
          id: file.fileId,
        }),
      ),
      fixtureImageFiles: fixtureImageFiles.map(file => ({
        id: file.fileId,
      })),
      fixtureSoftwareEvidenceFiles: fixtureSoftwareEvidenceFiles.map(file => ({
        id: file.fileId,
      })),
      foodExpenseFiles: foodExpenseFiles.map(file => ({
        id: file.fileId,
      })),
      laborContractFiles: laborContractFiles.map(file => ({
        id: file.fileId,
      })),
      externalEventParticipationFeeFiles:
        externalEventParticipationFeeFiles.map(file => ({
          id: file.fileId,
        })),
      publicationFiles: publicationFiles.map(file => ({
        id: file.fileId,
      })),
      profitMakingActivityFiles: profitMakingActivityFiles.map(file => ({
        id: file.fileId,
      })),
      jointExpenseFiles: jointExpenseFiles.map(file => ({
        id: file.fileId,
      })),
      etcExpenseFiles: etcExpenseFiles.map(file => ({
        id: file.fileId,
      })),
      transportationPassengers: transportationPassengers.map(passenger => ({
        id: passenger.studentId,
      })),
    });
  }

  async selectAll(
    clubId: number,
    semesterId: number,
  ): Promise<IFundingSummary[]> {
    const fundingOrders = await this.db
      .select({
        id: FundingOrder.id,
        name: FundingOrder.name,
        expenditureAmount: FundingOrder.expenditureAmount,
        approvedAmount: FundingOrder.approvedAmount,
        fundingOrderStatusEnumId: FundingOrder.fundingOrderStatusEnumId,
        purposeActivity: FundingOrder.purposeId,
      })
      .from(FundingOrder)
      .where(
        and(
          eq(FundingOrder.clubId, clubId),
          eq(FundingOrder.semesterId, semesterId),
          isNull(FundingOrder.deletedAt),
        ),
      );

    if (fundingOrders.length === 0) {
      return [];
    }

    return fundingOrders.map(fundingOrder => ({
      ...fundingOrder,
      purposeActivity: {
        id: fundingOrder.purposeActivity,
      },
    }));
  }

  async insert(funding: IFundingRequest): Promise<MFunding> {
    const result = await this.db.transaction(async tx => {
      // 1. Insert funding order
      const [fundingOrder] = await tx.insert(FundingOrder).values({
        clubId: funding.clubId,
        purposeId: funding.purposeActivity.id,
        semesterId: funding.semesterId,
        fundingOrderStatusEnumId: funding.fundingOrderStatusEnumId,
        name: funding.name,
        expenditureDate: funding.expenditureDate,
        expenditureAmount: funding.expenditureAmount,
        approvedAmount: funding.approvedAmount,
        isFixture: funding.isFixture,
        isTransportation: funding.isTransportation,
        isFoodExpense: funding.isFoodExpense,
        isLaborContract: funding.isLaborContract,
        isExternalEventParticipationFee:
          funding.isExternalEventParticipationFee,
        isPublication: funding.isPublication,
        isProfitMakingActivity: funding.isProfitMakingActivity,
        isJointExpense: funding.isJointExpense,
        isEtcExpense: funding.isEtcExpense,
        isNonCorporateTransaction: funding.isNonCorporateTransaction,
        tradeDetailExplanation: funding.tradeDetailExplanation,
      });

      const fundingOrderId = Number(fundingOrder.insertId);

      // 3. Insert files and related data
      await Promise.all([
        // Trade files
        ...funding.tradeEvidenceFiles.map(file =>
          tx.insert(TradeEvidenceFile).values({
            fundingOrderId,
            fileId: file.id,
          }),
        ),
        ...funding.tradeDetailFiles.map(file =>
          tx.insert(TradeDetailFile).values({
            fundingOrderId,
            fileId: file.id,
          }),
        ),

        // Club supplies files
        ...(funding.clubSupplies && funding.clubSupplies.imageFiles
          ? funding.clubSupplies.imageFiles.map(file =>
              tx.insert(ClubSuppliesImageFile).values({
                fundingOrderId,
                fileId: file.id,
              }),
            )
          : []),
        ...(funding.clubSupplies && funding.clubSupplies.softwareEvidenceFiles
          ? funding.clubSupplies.softwareEvidenceFiles.map(file =>
              tx.insert(ClubSuppliesSoftwareEvidenceFile).values({
                fundingOrderId,
                fileId: file.id,
              }),
            )
          : []),

        // Fixture files
        ...(funding.isFixture && funding.fixture.imageFiles
          ? funding.fixture.imageFiles.map(file =>
              tx.insert(FixtureImageFile).values({
                fundingOrderId,
                fileId: file.id,
              }),
            )
          : []),
        ...(funding.isFixture && funding.fixture.softwareEvidenceFiles
          ? funding.fixture.softwareEvidenceFiles.map(file =>
              tx.insert(FixtureSoftwareEvidenceFile).values({
                fundingOrderId,
                fileId: file.id,
              }),
            )
          : []),

        // Food expense files
        ...(funding.isFoodExpense && funding.foodExpense
          ? funding.foodExpense.files.map(file =>
              tx.insert(FoodExpenseFile).values({
                fundingOrderId,
                fileId: file.id,
              }),
            )
          : []),

        // Labor contract files
        ...(funding.isLaborContract && funding.laborContract
          ? funding.laborContract.files.map(file =>
              tx.insert(LaborContractFile).values({
                fundingOrderId,
                fileId: file.id,
              }),
            )
          : []),

        // External event participation fee files
        ...(funding.isExternalEventParticipationFee &&
        funding.externalEventParticipationFee
          ? funding.externalEventParticipationFee.files.map(file =>
              tx.insert(ExternalEventParticipationFeeFile).values({
                fundingOrderId,
                fileId: file.id,
              }),
            )
          : []),

        // Publication files
        ...(funding.isPublication && funding.publication
          ? funding.publication.files.map(file =>
              tx.insert(PublicationFile).values({
                fundingOrderId,
                fileId: file.id,
              }),
            )
          : []),

        // Profit making activity files
        ...(funding.isProfitMakingActivity && funding.profitMakingActivity
          ? funding.profitMakingActivity.files.map(file =>
              tx.insert(ProfitMakingActivityFile).values({
                fundingOrderId,
                fileId: file.id,
              }),
            )
          : []),

        // Joint expense files
        ...(funding.isJointExpense && funding.jointExpense
          ? funding.jointExpense.files.map(file =>
              tx.insert(JointExpenseFile).values({
                fundingOrderId,
                fileId: file.id,
              }),
            )
          : []),

        // Etc expense files
        ...(funding.isEtcExpense && funding.etcExpense
          ? funding.etcExpense.files.map(file =>
              tx.insert(EtcExpenseFile).values({
                fundingOrderId,
                fileId: file.id,
              }),
            )
          : []),

        // Transportation passengers
        ...(funding.isTransportation && funding.transportation
          ? funding.transportation.passengers.map(passenger =>
              tx.insert(TransportationPassenger).values({
                fundingOrderId,
                studentId: passenger.id,
              }),
            )
          : []),
      ]);

      return fundingOrderId;
    });

    // 4. Return the newly created funding
    return this.select(result);
  }

  async delete(id: number): Promise<void> {
    await this.db.transaction(async tx => {
      const now = new Date();

      // Soft delete funding order and all related records
      await Promise.all([
        tx
          .update(FundingOrder)
          .set({ deletedAt: now })
          .where(eq(FundingOrder.id, id)),
        tx
          .update(FundingOrderFeedback)
          .set({ deletedAt: now })
          .where(eq(FundingOrderFeedback.fundingOrderId, id)),
        tx
          .update(TradeEvidenceFile)
          .set({ deletedAt: now })
          .where(eq(TradeEvidenceFile.fundingOrderId, id)),
        tx
          .update(TradeDetailFile)
          .set({ deletedAt: now })
          .where(eq(TradeDetailFile.fundingOrderId, id)),
        tx
          .update(ClubSuppliesImageFile)
          .set({ deletedAt: now })
          .where(eq(ClubSuppliesImageFile.fundingOrderId, id)),
        tx
          .update(ClubSuppliesSoftwareEvidenceFile)
          .set({ deletedAt: now })
          .where(eq(ClubSuppliesSoftwareEvidenceFile.fundingOrderId, id)),
        tx
          .update(FixtureImageFile)
          .set({ deletedAt: now })
          .where(eq(FixtureImageFile.fundingOrderId, id)),
        tx
          .update(FixtureSoftwareEvidenceFile)
          .set({ deletedAt: now })
          .where(eq(FixtureSoftwareEvidenceFile.fundingOrderId, id)),
        tx
          .update(FoodExpenseFile)
          .set({ deletedAt: now })
          .where(eq(FoodExpenseFile.fundingOrderId, id)),
        tx
          .update(LaborContractFile)
          .set({ deletedAt: now })
          .where(eq(LaborContractFile.fundingOrderId, id)),
        tx
          .update(ExternalEventParticipationFeeFile)
          .set({ deletedAt: now })
          .where(eq(ExternalEventParticipationFeeFile.fundingOrderId, id)),
        tx
          .update(PublicationFile)
          .set({ deletedAt: now })
          .where(eq(PublicationFile.fundingOrderId, id)),
        tx
          .update(ProfitMakingActivityFile)
          .set({ deletedAt: now })
          .where(eq(ProfitMakingActivityFile.fundingOrderId, id)),
        tx
          .update(JointExpenseFile)
          .set({ deletedAt: now })
          .where(eq(JointExpenseFile.fundingOrderId, id)),
        tx
          .update(EtcExpenseFile)
          .set({ deletedAt: now })
          .where(eq(EtcExpenseFile.fundingOrderId, id)),
        tx
          .update(TransportationPassenger)
          .set({ deletedAt: now })
          .where(eq(TransportationPassenger.fundingOrderId, id)),
      ]);
    });
  }

  async put(id: number, funding: IFundingRequest): Promise<MFunding> {
    await this.delete(id);
    return this.insert(funding);
  }
}
