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
  FundingOrderFeedback,
  JointExpenseFile,
  LaborContractFile,
  ProfitMakingActivityFile,
  PublicationFile,
  TradeDetailFile,
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
      .select({
        clubId: FundingOrder.clubId,
        purposeId: FundingOrder.purposeId,
        name: FundingOrder.name,
        expenditureDate: FundingOrder.expenditureDate,
        expenditureAmount: FundingOrder.expenditureAmount,
        fundingOrderStatusEnumId: FundingOrder.fundingOrderStatusEnumId,
        feedback: FundingOrderFeedback.feedback,
        tradeEvidenceFiles: { uid: TradeEvidenceFile.fileUid },
        tradeDetailFiles: { uid: TradeDetailFile.fileUid },
        tradeDetailExplanation: FundingOrder.tradeDetailExplanation,
        clubSuppliesName: FundingOrder.clubSuppliesName,
        clubSuppliesEvidenceEnumId: FundingOrder.clubSuppliesEvidenceEnumId,
        clubSuppliesClassEnumId: FundingOrder.clubSuppliesClassEnumId,
        clubSuppliesPurpose: FundingOrder.clubSuppliesPurpose,
        clubSuppliesImageFiles: { uid: ClubSuppliesImageFile.fileUid },
        clubSuppliesSoftwareEvidenceFiles: {
          uid: ClubSuppliesSoftwareEvidenceFile.fileUid,
        },
        clubSuppliesSoftwareEvidence: FundingOrder.clubSuppliesSoftwareEvidence,
        numberOfClubSupplies: FundingOrder.numberOfClubSupplies,
        priceOfClubSupplies: FundingOrder.priceOfClubSupplies,
        isFixture: FundingOrder.isFixture,
        fixtureName: FundingOrder.fixtureName,
        fixtureEvidenceEnumId: FundingOrder.fixtureEvidenceEnumId,
        fixtureClassEnumId: FundingOrder.fixtureClassEnumId,
        fixturePurpose: FundingOrder.fixturePurpose,
        fixtureImageFiles: { uid: FixtureImageFile.fileUid },
        fixtureSoftwareEvidenceFiles: {
          uid: FixtureSoftwareEvidenceFile.fileUid,
        },
        fixtureSoftwareEvidence: FundingOrder.fixtureSoftwareEvidence,
        numberOfFixture: FundingOrder.numberOfFixture,
        priceOfFixture: FundingOrder.priceOfFixture,
        isTransportation: FundingOrder.isTransportation,
        transportationEnumId: FundingOrder.transportationEnumId,
        transportationPassengers: {
          studentNumber: TransportationPassenger.studentId,
        },
        origin: FundingOrder.origin,
        destination: FundingOrder.destination,
        purposeOfTransportation: FundingOrder.purposeOfTransportation,
        placeValidity: FundingOrder.placeValidity,
        isNonCorporateTransaction: FundingOrder.isNonCorporateTransaction,
        traderName: FundingOrder.traderName,
        traderAccountNumber: FundingOrder.traderAccountNumber,
        wasteExplanation: FundingOrder.wasteExplanation,
        isFoodExpense: FundingOrder.isFoodExpense,
        foodExpenseExplanation: FundingOrder.foodExpenseExplanation,
        foodExpenseFiles: { uid: FoodExpenseFile.fileUid },
        isLaborContract: FundingOrder.isLaborContract,
        laborContractExplanation: FundingOrder.laborContractExplanation,
        laborContractFiles: { uid: LaborContractFile.fileUid },
        isExternalEventParticipationFee:
          FundingOrder.isExternalEventParticipationFee,
        externalEventParticipationFeeExplanation:
          FundingOrder.externalEventParticipationFeeExplanation,
        externalEventParticipationFeeFiles: {
          uid: ExternalEventParticipationFeeFile.fileUid,
        },
        isPublication: FundingOrder.isPublication,
        publicationExplanation: FundingOrder.publicationExplanation,
        publicationFiles: { uid: PublicationFile.fileUid },
        isProfitMakingActivity: FundingOrder.isProfitMakingActivity,
        profitMakingActivityExplanation:
          FundingOrder.profitMakingActivityExplanation,
        profitMakingActivityFiles: { uid: ProfitMakingActivityFile.fileUid },
        isJointExpense: FundingOrder.isJointExpense,
        jointExpenseExplanation: FundingOrder.jointExpenseExplanation,
        jointExpenseFiles: { uid: JointExpenseFile.fileUid },
        isEtcExpense: FundingOrder.isEtcExpense,
        etcExpenseExplanation: FundingOrder.etcExpenseExplanation,
        etcExpenseFiles: { uid: EtcExpenseFile.fileUid },
      })
      .from(FundingOrder)
      .leftJoin(
        TradeEvidenceFile,
        eq(TradeEvidenceFile.fundingOrderId, fundingId),
      )
      .leftJoin(TradeDetailFile, eq(TradeDetailFile.fundingOrderId, fundingId))
      .leftJoin(
        FundingOrderFeedback,
        eq(FundingOrderFeedback.fundingOrderId, fundingId),
      )
      .leftJoin(
        TransportationPassenger,
        eq(TransportationPassenger.fundingOrderId, fundingId),
      )
      .leftJoin(
        ClubSuppliesImageFile,
        eq(ClubSuppliesImageFile.fundingOrderId, fundingId),
      )
      .leftJoin(
        ClubSuppliesSoftwareEvidenceFile,
        eq(ClubSuppliesSoftwareEvidenceFile.fundingOrderId, fundingId),
      )
      .leftJoin(
        FixtureImageFile,
        eq(FixtureImageFile.fundingOrderId, fundingId),
      )
      .leftJoin(
        FixtureSoftwareEvidenceFile,
        eq(FixtureSoftwareEvidenceFile.fundingOrderId, fundingId),
      )
      .leftJoin(FoodExpenseFile, eq(FoodExpenseFile.fundingOrderId, fundingId))
      .leftJoin(
        LaborContractFile,
        eq(LaborContractFile.fundingOrderId, fundingId),
      )
      .leftJoin(
        ExternalEventParticipationFeeFile,
        eq(ExternalEventParticipationFeeFile.fundingOrderId, fundingId),
      )
      .leftJoin(PublicationFile, eq(PublicationFile.fundingOrderId, fundingId))
      .leftJoin(
        ProfitMakingActivityFile,
        eq(ProfitMakingActivityFile.fundingOrderId, fundingId),
      )
      .leftJoin(
        JointExpenseFile,
        eq(JointExpenseFile.fundingOrderId, fundingId),
      )
      .leftJoin(EtcExpenseFile, eq(EtcExpenseFile.fundingOrderId, fundingId))
      .where(
        and(eq(FundingOrder.id, fundingId), isNull(FundingOrder.deletedAt)),
      );
    return result;
  }

  async putStudentFunding(
    contents: {
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
    },
    fundingId: number,
  ): Promise<boolean> {
    const isUpdateSucceed = await this.db.transaction(async tx => {
      const deletedAt = new Date();
      const [fundingUpdateResult] = await tx
        .update(FundingOrder)
        .set({
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
        })
        .where(
          and(eq(FundingOrder.id, fundingId), isNull(FundingOrder.deletedAt)),
        );

      if (fundingUpdateResult.affectedRows !== 1) {
        logger.debug("[putStudentFunding] rollback occurs");
        tx.rollback();
        return false;
      }

      // 탑승자 전체 삭제 및 재생성
      const [passengerDeletionResult] = await tx
        .update(TransportationPassenger)
        .set({ deletedAt })
        .where(
          and(
            eq(TransportationPassenger.fundingOrderId, fundingId),
            isNull(TransportationPassenger.deletedAt),
          ),
        );
      if (passengerDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] passenger deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        contents.transportationPassengers.map(async passenger => {
          const [passengerInsertResult] = await tx
            .insert(TransportationPassenger)
            .values({
              fundingOrderId: fundingId,
              studentId: Number(passenger.studentNumber),
            });

          if (passengerInsertResult.affectedRows !== 1) {
            logger.debug(
              "[putStudentFunding] passenger insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      // 파일 전체 삭제 및 재생성
      const [tradeEvidenceFileDeletionResult] = await tx
        .update(TradeEvidenceFile)
        .set({ deletedAt })
        .where(
          and(
            eq(TradeEvidenceFile.fundingOrderId, fundingId),
            isNull(TradeEvidenceFile.deletedAt),
          ),
        );
      if (tradeEvidenceFileDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] tradeEvidenceFile deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        contents.tradeEvidenceFiles.map(async file => {
          const [tradeEvidenceFileInsertResult] = await tx
            .insert(TradeEvidenceFile)
            .values({
              fundingOrderId: fundingId,
              fileUid: file.uid,
            });
          if (tradeEvidenceFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[putStudentFunding] tradeEvidenceFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      const [tradeDetailFileDeletionResult] = await tx
        .update(TradeEvidenceFile)
        .set({ deletedAt })
        .where(
          and(
            eq(TradeEvidenceFile.fundingOrderId, fundingId),
            isNull(TradeEvidenceFile.deletedAt),
          ),
        );
      if (tradeDetailFileDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] tradeDetailFile deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        contents.tradeDetailFiles.map(async file => {
          const [tradeDetailFileInsertResult] = await tx
            .insert(TradeEvidenceFile)
            .values({
              fundingOrderId: fundingId,
              fileUid: file.uid,
            });
          if (tradeDetailFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[putStudentFunding] tradeDetailFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      const [clubSuppliesImageFileDeletionResult] = await tx
        .update(ClubSuppliesImageFile)
        .set({ deletedAt })
        .where(
          and(
            eq(ClubSuppliesImageFile.fundingOrderId, fundingId),
            isNull(ClubSuppliesImageFile.deletedAt),
          ),
        );
      if (clubSuppliesImageFileDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] clubSuppliesImageFile deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        contents.clubSuppliesImageFiles.map(async file => {
          const [clubSuppliesImageFileInsertResult] = await tx
            .insert(ClubSuppliesImageFile)
            .values({
              fundingOrderId: fundingId,
              fileUid: file.uid,
            });
          if (clubSuppliesImageFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[putStudentFunding] clubSuppliesImageFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      const [clubSuppliesSoftwareEvidenceFileDeletionResult] = await tx
        .update(ClubSuppliesSoftwareEvidenceFile)
        .set({ deletedAt })
        .where(
          and(
            eq(ClubSuppliesSoftwareEvidenceFile.fundingOrderId, fundingId),
            isNull(ClubSuppliesSoftwareEvidenceFile.deletedAt),
          ),
        );
      if (clubSuppliesSoftwareEvidenceFileDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] clubSuppliesSoftwareEvidenceFile deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        contents.clubSuppliesSoftwareEvidenceFiles.map(async file => {
          const [clubSuppliesSoftwareEvidenceFileInsertResult] = await tx
            .insert(ClubSuppliesSoftwareEvidenceFile)
            .values({
              fundingOrderId: fundingId,
              fileUid: file.uid,
            });
          if (clubSuppliesSoftwareEvidenceFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[putStudentFunding] clubSuppliesSoftwareEvidenceFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      const [fixtureImageFileDeletionResult] = await tx
        .update(FixtureImageFile)
        .set({ deletedAt })
        .where(
          and(
            eq(FixtureImageFile.fundingOrderId, fundingId),
            isNull(FixtureImageFile.deletedAt),
          ),
        );
      if (fixtureImageFileDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] fixtureImageFile deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        contents.fixtureImageFiles.map(async file => {
          const [fixtureImageFileInsertResult] = await tx
            .insert(FixtureImageFile)
            .values({
              fundingOrderId: fundingId,
              fileUid: file.uid,
            });
          if (fixtureImageFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[putStudentFunding] fixtureImageFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      const [fixtureSoftwareEvidenceFileDeletionResult] = await tx
        .update(FixtureSoftwareEvidenceFile)
        .set({ deletedAt })
        .where(
          and(
            eq(FixtureSoftwareEvidenceFile.fundingOrderId, fundingId),
            isNull(FixtureSoftwareEvidenceFile.deletedAt),
          ),
        );
      if (fixtureSoftwareEvidenceFileDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] fixtureSoftwareEvidenceFile deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        contents.fixtureSoftwareEvidenceFiles.map(async file => {
          const [fixtureSoftwareEvidenceFileInsertResult] = await tx
            .insert(FixtureSoftwareEvidenceFile)
            .values({
              fundingOrderId: fundingId,
              fileUid: file.uid,
            });
          if (fixtureSoftwareEvidenceFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[putStudentFunding] fixtureSoftwareEvidenceFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      const [foodExpenseFileDeletionResult] = await tx
        .update(FoodExpenseFile)
        .set({ deletedAt })
        .where(
          and(
            eq(FoodExpenseFile.fundingOrderId, fundingId),
            isNull(FoodExpenseFile.deletedAt),
          ),
        );
      if (foodExpenseFileDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] foodExpenseFile deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        contents.foodExpenseFiles.map(async file => {
          const [foodExpenseFileInsertResult] = await tx
            .insert(FoodExpenseFile)
            .values({
              fundingOrderId: fundingId,
              fileUid: file.uid,
            });
          if (foodExpenseFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[putStudentFunding] foodExpenseFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      const [laborContractFileDeletionResult] = await tx
        .update(LaborContractFile)
        .set({ deletedAt })
        .where(
          and(
            eq(LaborContractFile.fundingOrderId, fundingId),
            isNull(LaborContractFile.deletedAt),
          ),
        );
      if (laborContractFileDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] laborContractFile deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        contents.laborContractFiles.map(async file => {
          const [laborContractFileInsertResult] = await tx
            .insert(LaborContractFile)
            .values({
              fundingOrderId: fundingId,
              fileUid: file.uid,
            });
          if (laborContractFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[putStudentFunding] laborContractFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      const [externalEventParticipationFeeFileDeletionResult] = await tx
        .update(ExternalEventParticipationFeeFile)
        .set({ deletedAt })
        .where(
          and(
            eq(ExternalEventParticipationFeeFile.fundingOrderId, fundingId),
            isNull(ExternalEventParticipationFeeFile.deletedAt),
          ),
        );
      if (externalEventParticipationFeeFileDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] externalEventParticipationFeeFile deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        contents.externalEventParticipationFeeFiles.map(async file => {
          const [externalEventParticipationFeeFileInsertResult] = await tx
            .insert(ExternalEventParticipationFeeFile)
            .values({
              fundingOrderId: fundingId,
              fileUid: file.uid,
            });
          if (
            externalEventParticipationFeeFileInsertResult.affectedRows !== 1
          ) {
            logger.debug(
              "[putStudentFunding] externalEventParticipationFeeFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      const [publicationFileDeletionResult] = await tx
        .update(PublicationFile)
        .set({ deletedAt })
        .where(
          and(
            eq(PublicationFile.fundingOrderId, fundingId),
            isNull(PublicationFile.deletedAt),
          ),
        );
      if (publicationFileDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] publicationFile deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        contents.publicationFiles.map(async file => {
          const [publicationFileInsertResult] = await tx
            .insert(PublicationFile)
            .values({
              fundingOrderId: fundingId,
              fileUid: file.uid,
            });
          if (publicationFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[putStudentFunding] publicationFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      const [profitMakingActivityFileDeletionResult] = await tx
        .update(ProfitMakingActivityFile)
        .set({ deletedAt })
        .where(
          and(
            eq(ProfitMakingActivityFile.fundingOrderId, fundingId),
            isNull(ProfitMakingActivityFile.deletedAt),
          ),
        );
      if (profitMakingActivityFileDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] profitMakingActivityFile deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        contents.profitMakingActivityFiles.map(async file => {
          const [profitMakingActivityFileInsertResult] = await tx
            .insert(ProfitMakingActivityFile)
            .values({
              fundingOrderId: fundingId,
              fileUid: file.uid,
            });
          if (profitMakingActivityFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[putStudentFunding] profitMakingActivityFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      const [jointExpenseFileDeletionResult] = await tx
        .update(JointExpenseFile)
        .set({ deletedAt })
        .where(
          and(
            eq(JointExpenseFile.fundingOrderId, fundingId),
            isNull(JointExpenseFile.deletedAt),
          ),
        );

      if (jointExpenseFileDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] jointExpenseFile deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        contents.jointExpenseFiles.map(async file => {
          const [jointExpenseFileInsertResult] = await tx
            .insert(JointExpenseFile)
            .values({
              fundingOrderId: fundingId,
              fileUid: file.uid,
            });
          if (jointExpenseFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[putStudentFunding] jointExpenseFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      const [etcExpenseFileDeletionResult] = await tx
        .update(EtcExpenseFile)
        .set({ deletedAt })
        .where(
          and(
            eq(EtcExpenseFile.fundingOrderId, fundingId),
            isNull(EtcExpenseFile.deletedAt),
          ),
        );
      if (etcExpenseFileDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] etcExpenseFile deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }
      await Promise.all(
        contents.etcExpenseFiles.map(async file => {
          const [etcExpenseFileInsertResult] = await tx
            .insert(EtcExpenseFile)
            .values({
              fundingOrderId: fundingId,
              fileUid: file.uid,
            });
          if (etcExpenseFileInsertResult.affectedRows !== 1) {
            logger.debug(
              "[putStudentFunding] etcExpenseFile insert failed. Rollback occurs",
            );
            tx.rollback();
            return false;
          }
          return {};
        }),
      );

      return true;
    });

    return isUpdateSucceed;
  }
}
