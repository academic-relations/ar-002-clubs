import { Inject, Injectable } from "@nestjs/common";
import { FundingOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";
import { and, eq, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
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
  JointExpenseFile,
  LaborContractFile,
  ProfitMakingActivityFile,
  PublicationFile,
  TradeEvidenceFile,
  TransportationPassenger,
} from "@sparcs-clubs/api/drizzle/schema/funding.schema";

@Injectable()
export default class FundingRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async insertFunding(contents: {
    clubId: number;
    purposeId?: number;
    name: string;
    expenditureDate: Date;
    expenditureAmount: number;

    tradeEvidenceFiles: Array<{ uid: string }>;
    tradeDetailFiles: Array<{ uid: string }>;
    tradeDetailExplanation: string;

    clubSuppliesName?: string;
    clubSuppliesEvidenceEnumId?: number;
    clubSuppliesClassEnumId?: number;
    clubSuppliesPurpose?: string;
    clubSuppliesImageFiles?: Array<{ uid: string }>;
    clubSuppliesSoftwareEvidence?: string;
    clubSuppliesSoftwareEvidenceFiles?: Array<{ uid: string }>;
    numberOfClubSupplies?: number;
    priceOfClubSupplies?: number;

    isFixture: boolean;
    fixtureName?: string;
    fixtureEvidenceEnumId?: number;
    fixtureClassEnumId?: number;
    fixturePurpose?: string;
    fixtureImageFiles: Array<{ uid: string }>;
    fixtureSoftwareEvidence?: string;
    fixtureSoftwareEvidenceFiles: Array<{ uid: string }>;
    numberOfFixture?: number;
    priceOfFixture?: number;

    isTransportation: boolean;
    transportationEnumId?: number;
    origin?: string;
    destination?: string;
    purposeOfTransportation?: string;
    placeValidity?: string;
    transportationPassengers: Array<{ studentNumber: string }>;

    isNonCorporateTransaction: boolean;
    traderName?: string;
    traderAccountNumber?: string;
    wasteExplanation?: string;

    isFoodExpense: boolean;
    foodExpenseExplanation?: string;
    foodExpenseFiles: Array<{ uid: string }>;

    isLaborContract: boolean;
    laborContractExplanation?: string;
    laborContractFiles: Array<{ uid: string }>;

    isExternalEventParticipationFee: boolean;
    externalEventParticipationFeeExplanation?: string;
    externalEventParticipationFeeFiles: Array<{ uid: string }>;

    isPublication: boolean;
    publicationExplanation?: string;
    publicationFiles: Array<{ uid: string }>;

    isProfitMakingActivity: boolean;
    profitMakingActivityExplanation?: string;
    profitMakingActivityFiles: Array<{ uid: string }>;

    isJointExpense: boolean;
    jointExpenseExplanation?: string;
    jointExpenseFiles: Array<{ uid: string }>;

    isEtcExpense: boolean;
    etcExpenseExplanation?: string;
    etcExpenseFiles: Array<{ uid: string }>;
  }): Promise<boolean> {
    const isInsertionSucceed = await this.db.transaction(async tx => {
      const [fundingInsertResult] = await tx.insert(FundingOrder).values({
        clubId: contents.clubId,
        purposeId: contents.purposeId,
        // TODO: semesterId 받아오기
        semesterId: 1,
        fundingOrderStatusEnumId: Number(FundingOrderStatusEnum.Applied),
        name: contents.name,
        expenditureDate: contents.expenditureDate,
        expenditureAmount: contents.expenditureAmount,
        tradeDetailExplanation: contents.tradeDetailExplanation,
        clubSuppliesName: contents.clubSuppliesName,
        clubSuppliesEvidenceEnumId: contents.clubSuppliesEvidenceEnumId,
        clubSuppliesClassEnumId: contents.clubSuppliesClassEnumId,
        clubSuppliesPurpose: contents.clubSuppliesPurpose,
        clubSuppliesSoftwareEvidence: contents.clubSuppliesSoftwareEvidence,
        numberOfClubSupplies: contents.numberOfClubSupplies,
        priceOfClubSupplies: contents.priceOfClubSupplies,
        isFixture: contents.isFixture,
        fixtureName: contents.fixtureName,
        fixtureEvidenceEnumId: contents.fixtureEvidenceEnumId,
        fixtureClassEnumId: contents.fixtureClassEnumId,
        fixturePurpose: contents.fixturePurpose,
        fixtureSoftwareEvidence: contents.fixtureSoftwareEvidence,
        numberOfFixture: contents.numberOfFixture,
        priceOfFixture: contents.priceOfFixture,
        isTransportation: contents.isTransportation,
        transportationEnumId: contents.transportationEnumId,
        origin: contents.origin,
        destination: contents.destination,
        purposeOfTransportation: contents.purposeOfTransportation,
        placeValidity: contents.placeValidity,
        isNonCorporateTransaction: contents.isNonCorporateTransaction,
        traderName: contents.traderName,
        traderAccountNumber: contents.traderAccountNumber,
        wasteExplanation: contents.wasteExplanation,
        isFoodExpense: contents.isFoodExpense,
        foodExpenseExplanation: contents.foodExpenseExplanation,
        isLaborContract: contents.isLaborContract,
        laborContractExplanation: contents.laborContractExplanation,
        isExternalEventParticipationFee:
          contents.isExternalEventParticipationFee,
        externalEventParticipationFeeExplanation:
          contents.externalEventParticipationFeeExplanation,
        isPublication: contents.isPublication,
        publicationExplanation: contents.publicationExplanation,
        isProfitMakingActivity: contents.isProfitMakingActivity,
        profitMakingActivityExplanation:
          contents.profitMakingActivityExplanation,
        isJointExpense: contents.isJointExpense,
        jointExpenseExplanation: contents.jointExpenseExplanation,
        isEtcExpense: contents.isEtcExpense,
        etcExpenseExplanation: contents.etcExpenseExplanation,
        createdAt: new Date(),
      });
      if (fundingInsertResult.affectedRows !== 1) {
        logger.debug("[insertFunding] rollback occurs");
        tx.rollback();
        return false;
      }
      logger.debug(
        `[insertFunding] funding inserted: ${fundingInsertResult.insertId}`,
      );

      await Promise.all(
        contents.transportationPassengers.map(async passenger => {
          const [passengerInsertResult] = await tx
            .insert(TransportationPassenger)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              studentId: Number(passenger.studentNumber),
            });

          if (passengerInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertFunding] passenger insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      await Promise.all(
        contents.tradeEvidenceFiles.map(async file => {
          const [tradeEvidenceFileInsertResult] = await tx
            .insert(TradeEvidenceFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileUid: file.uid,
            });
          if (tradeEvidenceFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertFunding] tradeEvidenceFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      await Promise.all(
        contents.tradeDetailFiles.map(async file => {
          const [tradeDetailFileInsertResult] = await tx
            .insert(TradeEvidenceFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileUid: file.uid,
            });
          if (tradeDetailFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertFunding] tradeDetailFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      await Promise.all(
        contents.clubSuppliesImageFiles.map(async file => {
          const [clubSuppliesImageFileInsertResult] = await tx
            .insert(ClubSuppliesImageFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileUid: file.uid,
            });
          if (clubSuppliesImageFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertFunding] clubSuppliesImageFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      await Promise.all(
        contents.clubSuppliesSoftwareEvidenceFiles.map(async file => {
          const [clubSuppliesSoftwareEvidenceFileInsertResult] = await tx
            .insert(ClubSuppliesSoftwareEvidenceFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileUid: file.uid,
            });
          if (clubSuppliesSoftwareEvidenceFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertFunding] clubSuppliesSoftwareEvidenceFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      await Promise.all(
        contents.fixtureImageFiles.map(async file => {
          const [fixtureImageFileInsertResult] = await tx
            .insert(FixtureImageFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileUid: file.uid,
            });
          if (fixtureImageFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertFunding] fixtureImageFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      await Promise.all(
        contents.fixtureSoftwareEvidenceFiles.map(async file => {
          const [fixtureSoftwareEvidenceFileInsertResult] = await tx
            .insert(FixtureSoftwareEvidenceFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileUid: file.uid,
            });
          if (fixtureSoftwareEvidenceFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertFunding] fixtureSoftwareEvidenceFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      await Promise.all(
        contents.foodExpenseFiles.map(async file => {
          const [foodExpenseFileInsertResult] = await tx
            .insert(FoodExpenseFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileUid: file.uid,
            });
          if (foodExpenseFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertFunding] foodExpenseFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      await Promise.all(
        contents.laborContractFiles.map(async file => {
          const [laborContractFileInsertResult] = await tx
            .insert(LaborContractFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileUid: file.uid,
            });
          if (laborContractFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertFunding] laborContractFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      await Promise.all(
        contents.externalEventParticipationFeeFiles.map(async file => {
          const [externalEventParticipationFeeFileInsertResult] = await tx
            .insert(ExternalEventParticipationFeeFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileUid: file.uid,
            });
          if (
            externalEventParticipationFeeFileInsertResult.affectedRows !== 1
          ) {
            logger.debug(
              "[insertFunding] externalEventParticipationFeeFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      await Promise.all(
        contents.publicationFiles.map(async file => {
          const [publicationFileInsertResult] = await tx
            .insert(PublicationFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileUid: file.uid,
            });
          if (publicationFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertFunding] publicationFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      await Promise.all(
        contents.profitMakingActivityFiles.map(async file => {
          const [profitMakingActivityFileInsertResult] = await tx
            .insert(ProfitMakingActivityFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileUid: file.uid,
            });
          if (profitMakingActivityFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertFunding] profitMakingActivityFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      await Promise.all(
        contents.jointExpenseFiles.map(async file => {
          const [jointExpenseFileInsertResult] = await tx
            .insert(JointExpenseFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileUid: file.uid,
            });
          if (jointExpenseFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertFunding] jointExpenseFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      await Promise.all(
        contents.etcExpenseFiles.map(async file => {
          const [etcExpenseFileInsertResult] = await tx
            .insert(EtcExpenseFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileUid: file.uid,
            });
          if (etcExpenseFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[insertFunding] etcExpenseFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      return true;
    });
    return isInsertionSucceed;
  }

  async selectFundingByFundingId(fundingId: number) {
    const result = await this.db
      .select()
      .from(FundingOrder)
      .where(
        and(eq(FundingOrder.id, fundingId), isNull(FundingOrder.deletedAt)),
      );
    return result;
  }
}
