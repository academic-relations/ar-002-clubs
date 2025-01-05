import { Inject, Injectable } from "@nestjs/common";
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

import { FundingDto } from "../model/funding.dto.model";
import { Funding } from "../model/funding.model";
import { FundingSummaryDto } from "../model/funding.summury-dto.model";

@Injectable()
export default class FundingRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async select(id: number): Promise<Funding> {
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

    return new Funding(
      FundingDto.fromDBResult({
        fundingOrder: result[0].funding_order,
        fundingOrderFeedback: result[0].funding_order_feedback,
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
      }),
    );
  }

  async selectAll(
    clubId: number,
    semesterId: number,
  ): Promise<FundingSummaryDto[]> {
    const fundingOrders = await this.db
      .select({
        id: FundingOrder.id,
        activityName: FundingOrder.name,
        name: FundingOrder.name,
        expenditureAmount: FundingOrder.expenditureAmount,
        approvedAmount: FundingOrder.approvedAmount,
        fundingOrderStatusEnumId: FundingOrder.fundingOrderStatusEnumId,
        purposeId: FundingOrder.purposeId,
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

    return fundingOrders.map(
      fundingOrder => new FundingSummaryDto(fundingOrder),
    );
  }

  async insert(funding: FundingDto): Promise<Funding> {
    const result = await this.db.transaction(async tx => {
      // 1. Insert funding order
      const [fundingOrder] = await tx.insert(FundingOrder).values({
        clubId: funding.clubId,
        purposeId: funding.purposeId,
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
        isClubSupplies: funding.isClubSupplies,
        isNonCorporateTransaction: funding.isNonCorporateTransaction,
        tradeDetailExplanation: funding.tradeDetailExplanation,
      });

      const fundingOrderId = Number(fundingOrder.insertId);

      // 2. Insert feedback if exists
      if (funding.feedback) {
        await tx.insert(FundingOrderFeedback).values({
          fundingOrderId,
          chargedExecutiveId: 1, // TODO: 실제 값으로 대체 필요
          feedback: funding.feedback,
        });
      }

      // 3. Insert files and related data
      await Promise.all([
        // Trade files
        ...funding.tradeEvidenceFiles.map(file =>
          tx.insert(TradeEvidenceFile).values({
            fundingOrderId,
            fileId: file.fileId,
          }),
        ),
        ...funding.tradeDetailFiles.map(file =>
          tx.insert(TradeDetailFile).values({
            fundingOrderId,
            fileId: file.fileId,
          }),
        ),

        // Club supplies files
        ...(funding.isClubSupplies && funding.clubSuppliesImageFiles
          ? funding.clubSuppliesImageFiles.map(file =>
              tx.insert(ClubSuppliesImageFile).values({
                fundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),
        ...(funding.isClubSupplies && funding.clubSuppliesSoftwareEvidenceFiles
          ? funding.clubSuppliesSoftwareEvidenceFiles.map(file =>
              tx.insert(ClubSuppliesSoftwareEvidenceFile).values({
                fundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Fixture files
        ...(funding.isFixture && funding.fixtureImageFiles
          ? funding.fixtureImageFiles.map(file =>
              tx.insert(FixtureImageFile).values({
                fundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),
        ...(funding.isFixture && funding.fixtureSoftwareEvidenceFiles
          ? funding.fixtureSoftwareEvidenceFiles.map(file =>
              tx.insert(FixtureSoftwareEvidenceFile).values({
                fundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Food expense files
        ...(funding.isFoodExpense && funding.foodExpenseFiles
          ? funding.foodExpenseFiles.map(file =>
              tx.insert(FoodExpenseFile).values({
                fundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Labor contract files
        ...(funding.isLaborContract && funding.laborContractFiles
          ? funding.laborContractFiles.map(file =>
              tx.insert(LaborContractFile).values({
                fundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // External event participation fee files
        ...(funding.isExternalEventParticipationFee &&
        funding.externalEventParticipationFeeFiles
          ? funding.externalEventParticipationFeeFiles.map(file =>
              tx.insert(ExternalEventParticipationFeeFile).values({
                fundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Publication files
        ...(funding.isPublication && funding.publicationFiles
          ? funding.publicationFiles.map(file =>
              tx.insert(PublicationFile).values({
                fundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Profit making activity files
        ...(funding.isProfitMakingActivity && funding.profitMakingActivityFiles
          ? funding.profitMakingActivityFiles.map(file =>
              tx.insert(ProfitMakingActivityFile).values({
                fundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Joint expense files
        ...(funding.isJointExpense && funding.jointExpenseFiles
          ? funding.jointExpenseFiles.map(file =>
              tx.insert(JointExpenseFile).values({
                fundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Etc expense files
        ...(funding.isEtcExpense && funding.etcExpenseFiles
          ? funding.etcExpenseFiles.map(file =>
              tx.insert(EtcExpenseFile).values({
                fundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Transportation passengers
        ...(funding.isTransportation && funding.transportationPassengers
          ? funding.transportationPassengers.map(passenger =>
              tx.insert(TransportationPassenger).values({
                fundingOrderId,
                studentId: passenger.studentId,
              }),
            )
          : []),
      ]);

      return fundingOrderId;
    });

    // 4. Return the newly created funding
    return this.select(result);
  }

  async put(id: number, funding: FundingDto): Promise<Funding> {
    const fundingOrderId = await this.db.transaction(async tx => {
      // 1. Soft delete existing funding order and related records
      const now = new Date();

      await tx
        .update(FundingOrder)
        .set({ deletedAt: now })
        .where(eq(FundingOrder.id, id));

      await Promise.all([
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

      // 2. Insert new funding order
      const [fundingOrder] = await tx.insert(FundingOrder).values({
        clubId: funding.clubId,
        purposeId: funding.purposeId,
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
        isClubSupplies: funding.isClubSupplies,
        isNonCorporateTransaction: funding.isNonCorporateTransaction,
        tradeDetailExplanation: funding.tradeDetailExplanation,
      });

      const newFundingOrderId = Number(fundingOrder.insertId);

      // 3. Insert feedback if exists
      if (funding.feedback) {
        await tx.insert(FundingOrderFeedback).values({
          fundingOrderId: newFundingOrderId,
          chargedExecutiveId: 1, // TODO: 실제 값으로 대체 필요
          feedback: funding.feedback,
        });
      }

      // 4. Insert files and related data
      await Promise.all([
        // Trade files
        ...funding.tradeEvidenceFiles.map(file =>
          tx.insert(TradeEvidenceFile).values({
            fundingOrderId: newFundingOrderId,
            fileId: file.fileId,
          }),
        ),
        ...funding.tradeDetailFiles.map(file =>
          tx.insert(TradeDetailFile).values({
            fundingOrderId: newFundingOrderId,
            fileId: file.fileId,
          }),
        ),

        // Club supplies files
        ...(funding.isClubSupplies && funding.clubSuppliesImageFiles
          ? funding.clubSuppliesImageFiles.map(file =>
              tx.insert(ClubSuppliesImageFile).values({
                fundingOrderId: newFundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),
        ...(funding.isClubSupplies && funding.clubSuppliesSoftwareEvidenceFiles
          ? funding.clubSuppliesSoftwareEvidenceFiles.map(file =>
              tx.insert(ClubSuppliesSoftwareEvidenceFile).values({
                fundingOrderId: newFundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Fixture files
        ...(funding.isFixture && funding.fixtureImageFiles
          ? funding.fixtureImageFiles.map(file =>
              tx.insert(FixtureImageFile).values({
                fundingOrderId: newFundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),
        ...(funding.isFixture && funding.fixtureSoftwareEvidenceFiles
          ? funding.fixtureSoftwareEvidenceFiles.map(file =>
              tx.insert(FixtureSoftwareEvidenceFile).values({
                fundingOrderId: newFundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Food expense files
        ...(funding.isFoodExpense && funding.foodExpenseFiles
          ? funding.foodExpenseFiles.map(file =>
              tx.insert(FoodExpenseFile).values({
                fundingOrderId: newFundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Labor contract files
        ...(funding.isLaborContract && funding.laborContractFiles
          ? funding.laborContractFiles.map(file =>
              tx.insert(LaborContractFile).values({
                fundingOrderId: newFundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // External event participation fee files
        ...(funding.isExternalEventParticipationFee &&
        funding.externalEventParticipationFeeFiles
          ? funding.externalEventParticipationFeeFiles.map(file =>
              tx.insert(ExternalEventParticipationFeeFile).values({
                fundingOrderId: newFundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Publication files
        ...(funding.isPublication && funding.publicationFiles
          ? funding.publicationFiles.map(file =>
              tx.insert(PublicationFile).values({
                fundingOrderId: newFundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Profit making activity files
        ...(funding.isProfitMakingActivity && funding.profitMakingActivityFiles
          ? funding.profitMakingActivityFiles.map(file =>
              tx.insert(ProfitMakingActivityFile).values({
                fundingOrderId: newFundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Joint expense files
        ...(funding.isJointExpense && funding.jointExpenseFiles
          ? funding.jointExpenseFiles.map(file =>
              tx.insert(JointExpenseFile).values({
                fundingOrderId: newFundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Etc expense files
        ...(funding.isEtcExpense && funding.etcExpenseFiles
          ? funding.etcExpenseFiles.map(file =>
              tx.insert(EtcExpenseFile).values({
                fundingOrderId: newFundingOrderId,
                fileId: file.fileId,
              }),
            )
          : []),

        // Transportation passengers
        ...(funding.isTransportation && funding.transportationPassengers
          ? funding.transportationPassengers.map(passenger =>
              tx.insert(TransportationPassenger).values({
                fundingOrderId: newFundingOrderId,
                studentId: passenger.studentId,
              }),
            )
          : []),
      ]);

      return newFundingOrderId;
    });

    // 5. Return the updated funding
    return this.select(fundingOrderId);
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
}
