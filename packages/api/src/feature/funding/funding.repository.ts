import { Inject, Injectable } from "@nestjs/common";
import {
  FixtureClassEnum,
  FundingOrderStatusEnum,
  TransportationEnum,
} from "@sparcs-clubs/interface/common/enum/funding.enum";
import { and, eq, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
import { getKSTDate } from "@sparcs-clubs/api/common/util/util";
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

@Injectable()
export default class FundingRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async insertFunding(
    contents: {
      clubId: number;
      purposeId?: number;
      name: string;
      expenditureDate: Date;
      expenditureAmount: number;

      tradeEvidenceFiles: Array<{ fileId: string }>;
      tradeDetailFiles: Array<{ fileId: string }>;
      tradeDetailExplanation: string;

      clubSuppliesName?: string;
      clubSuppliesEvidenceEnumId?: number;
      clubSuppliesClassEnumId?: number;
      clubSuppliesPurpose?: string;
      clubSuppliesImageFiles?: Array<{ fileId: string }>;
      clubSuppliesSoftwareEvidence?: string;
      clubSuppliesSoftwareEvidenceFiles?: Array<{ fileId: string }>;
      numberOfClubSupplies?: number;
      priceOfClubSupplies?: number;

      isFixture: boolean;
      fixtureName?: string;
      fixtureEvidenceEnumId?: number;
      fixtureClassEnumId?: number;
      fixturePurpose?: string;
      fixtureImageFiles: Array<{ fileId: string }>;
      fixtureSoftwareEvidence?: string;
      fixtureSoftwareEvidenceFiles: Array<{ fileId: string }>;
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
      foodExpenseFiles: Array<{ fileId: string }>;

      isLaborContract: boolean;
      laborContractExplanation?: string;
      laborContractFiles: Array<{ fileId: string }>;

      isExternalEventParticipationFee: boolean;
      externalEventParticipationFeeExplanation?: string;
      externalEventParticipationFeeFiles: Array<{ fileId: string }>;

      isPublication: boolean;
      publicationExplanation?: string;
      publicationFiles: Array<{ fileId: string }>;

      isProfitMakingActivity: boolean;
      profitMakingActivityExplanation?: string;
      profitMakingActivityFiles: Array<{ fileId: string }>;

      isJointExpense: boolean;
      jointExpenseExplanation?: string;
      jointExpenseFiles: Array<{ fileId: string }>;

      isEtcExpense: boolean;
      etcExpenseExplanation?: string;
      etcExpenseFiles: Array<{ fileId: string }>;
    },
    semesterId: number,
  ): Promise<boolean> {
    const isInsertionSucceed = await this.db.transaction(async tx => {
      const [fundingInsertResult] = await tx.insert(FundingOrder).values({
        clubId: contents.clubId,
        purposeId: contents.purposeId,
        semesterId,
        fundingOrderStatusEnumId: Number(FundingOrderStatusEnum.Applied),
        name: contents.name,
        expenditureDate: contents.expenditureDate,
        expenditureAmount: contents.expenditureAmount,
        tradeDetailExplanation: contents.tradeDetailExplanation,
        clubSuppliesName:
          contents.purposeId === undefined ? contents.clubSuppliesName : null,
        clubSuppliesEvidenceEnumId:
          contents.purposeId === undefined
            ? contents.clubSuppliesEvidenceEnumId
            : null,
        clubSuppliesClassEnumId:
          contents.purposeId === undefined
            ? contents.clubSuppliesClassEnumId
            : null,
        clubSuppliesPurpose:
          contents.purposeId === undefined
            ? contents.clubSuppliesPurpose
            : null,
        clubSuppliesSoftwareEvidence:
          contents.purposeId === undefined &&
          contents.clubSuppliesClassEnumId === FixtureClassEnum.Software
            ? contents.clubSuppliesSoftwareEvidence
            : null,
        numberOfClubSupplies:
          contents.purposeId === undefined
            ? contents.numberOfClubSupplies
            : null,
        priceOfClubSupplies:
          contents.purposeId === undefined
            ? contents.priceOfClubSupplies
            : null,
        isFixture: contents.isFixture,
        fixtureName: contents.isFixture ? contents.fixtureName : null,
        fixtureEvidenceEnumId: contents.isFixture
          ? contents.fixtureEvidenceEnumId
          : null,
        fixtureClassEnumId: contents.isFixture
          ? contents.fixtureClassEnumId
          : null,
        fixturePurpose: contents.isFixture ? contents.fixturePurpose : null,
        fixtureSoftwareEvidence:
          contents.isFixture &&
          contents.fixtureClassEnumId === FixtureClassEnum.Software
            ? contents.fixtureSoftwareEvidence
            : null,
        numberOfFixture: contents.isFixture ? contents.numberOfFixture : null,
        priceOfFixture: contents.isFixture ? contents.priceOfFixture : null,
        isTransportation: contents.isTransportation,
        transportationEnumId: contents.isTransportation
          ? contents.transportationEnumId
          : null,
        origin: contents.isTransportation ? contents.origin : null,
        destination: contents.isTransportation ? contents.destination : null,
        purposeOfTransportation: contents.isTransportation
          ? contents.purposeOfTransportation
          : null,
        placeValidity:
          contents.isTransportation &&
          contents.transportationEnumId ===
            (TransportationEnum.Cargo ||
              TransportationEnum.CallVan ||
              TransportationEnum.Airplane ||
              TransportationEnum.Ship ||
              TransportationEnum.Others)
            ? contents.placeValidity
            : null,
        isNonCorporateTransaction: contents.isNonCorporateTransaction,
        traderName: contents.isNonCorporateTransaction
          ? contents.traderName
          : null,
        traderAccountNumber: contents.isNonCorporateTransaction
          ? contents.traderAccountNumber
          : null,
        wasteExplanation: contents.isNonCorporateTransaction
          ? contents.wasteExplanation
          : null,
        isFoodExpense: contents.isFoodExpense,
        foodExpenseExplanation: contents.isFoodExpense
          ? contents.foodExpenseExplanation
          : null,
        isLaborContract: contents.isLaborContract,
        laborContractExplanation: contents.isLaborContract
          ? contents.laborContractExplanation
          : null,
        isExternalEventParticipationFee:
          contents.isExternalEventParticipationFee,
        externalEventParticipationFeeExplanation:
          contents.isExternalEventParticipationFee
            ? contents.externalEventParticipationFeeExplanation
            : null,
        isPublication: contents.isPublication,
        publicationExplanation: contents.isPublication
          ? contents.publicationExplanation
          : null,
        isProfitMakingActivity: contents.isProfitMakingActivity,
        profitMakingActivityExplanation: contents.isProfitMakingActivity
          ? contents.profitMakingActivityExplanation
          : null,
        isJointExpense: contents.isJointExpense,
        jointExpenseExplanation: contents.isJointExpense
          ? contents.jointExpenseExplanation
          : null,
        isEtcExpense: contents.isEtcExpense,
        etcExpenseExplanation: contents.isEtcExpense
          ? contents.etcExpenseExplanation
          : null,
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

      if (
        contents.isTransportation &&
        contents.transportationEnumId ===
          (TransportationEnum.Taxi ||
            TransportationEnum.CallVan ||
            TransportationEnum.CharterBus ||
            TransportationEnum.Airplane ||
            TransportationEnum.Ship ||
            TransportationEnum.Others)
      ) {
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
      }

      await Promise.all(
        contents.tradeEvidenceFiles.map(async file => {
          const [tradeEvidenceFileInsertResult] = await tx
            .insert(TradeEvidenceFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileId: file.fileId,
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
            .insert(TradeDetailFile)
            .values({
              fundingOrderId: fundingInsertResult.insertId,
              fileId: file.fileId,
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

      if (contents.purposeId === undefined) {
        await Promise.all(
          contents.clubSuppliesImageFiles.map(async file => {
            const [clubSuppliesImageFileInsertResult] = await tx
              .insert(ClubSuppliesImageFile)
              .values({
                fundingOrderId: fundingInsertResult.insertId,
                fileId: file.fileId,
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
      }

      if (
        contents.purposeId === undefined &&
        contents.clubSuppliesClassEnumId === FixtureClassEnum.Software
      ) {
        await Promise.all(
          contents.clubSuppliesSoftwareEvidenceFiles.map(async file => {
            const [clubSuppliesSoftwareEvidenceFileInsertResult] = await tx
              .insert(ClubSuppliesSoftwareEvidenceFile)
              .values({
                fundingOrderId: fundingInsertResult.insertId,
                fileId: file.fileId,
              });
            if (
              clubSuppliesSoftwareEvidenceFileInsertResult.affectedRows !== 1
            ) {
              logger.debug(
                "[insertFunding] clubSuppliesSoftwareEvidenceFile insert failed. Rollback occurs",
              );
              tx.rollback();
              return false;
            }
            return {};
          }),
        );
      }

      if (contents.isFixture) {
        await Promise.all(
          contents.fixtureImageFiles.map(async file => {
            const [fixtureImageFileInsertResult] = await tx
              .insert(FixtureImageFile)
              .values({
                fundingOrderId: fundingInsertResult.insertId,
                fileId: file.fileId,
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
      }

      if (
        contents.isFixture &&
        contents.fixtureClassEnumId === FixtureClassEnum.Software
      ) {
        await Promise.all(
          contents.fixtureSoftwareEvidenceFiles.map(async file => {
            const [fixtureSoftwareEvidenceFileInsertResult] = await tx
              .insert(FixtureSoftwareEvidenceFile)
              .values({
                fundingOrderId: fundingInsertResult.insertId,
                fileId: file.fileId,
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
      }

      if (contents.isFoodExpense) {
        await Promise.all(
          contents.foodExpenseFiles.map(async file => {
            const [foodExpenseFileInsertResult] = await tx
              .insert(FoodExpenseFile)
              .values({
                fundingOrderId: fundingInsertResult.insertId,
                fileId: file.fileId,
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
      }

      if (contents.isLaborContract) {
        await Promise.all(
          contents.laborContractFiles.map(async file => {
            const [laborContractFileInsertResult] = await tx
              .insert(LaborContractFile)
              .values({
                fundingOrderId: fundingInsertResult.insertId,
                fileId: file.fileId,
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
      }

      if (contents.isExternalEventParticipationFee) {
        await Promise.all(
          contents.externalEventParticipationFeeFiles.map(async file => {
            const [externalEventParticipationFeeFileInsertResult] = await tx
              .insert(ExternalEventParticipationFeeFile)
              .values({
                fundingOrderId: fundingInsertResult.insertId,
                fileId: file.fileId,
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
      }

      if (contents.isPublication) {
        await Promise.all(
          contents.publicationFiles.map(async file => {
            const [publicationFileInsertResult] = await tx
              .insert(PublicationFile)
              .values({
                fundingOrderId: fundingInsertResult.insertId,
                fileId: file.fileId,
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
      }

      if (contents.isProfitMakingActivity) {
        await Promise.all(
          contents.profitMakingActivityFiles.map(async file => {
            const [profitMakingActivityFileInsertResult] = await tx
              .insert(ProfitMakingActivityFile)
              .values({
                fundingOrderId: fundingInsertResult.insertId,
                fileId: file.fileId,
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
      }

      if (contents.isJointExpense) {
        await Promise.all(
          contents.jointExpenseFiles.map(async file => {
            const [jointExpenseFileInsertResult] = await tx
              .insert(JointExpenseFile)
              .values({
                fundingOrderId: fundingInsertResult.insertId,
                fileId: file.fileId,
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
      }

      if (contents.isEtcExpense) {
        await Promise.all(
          contents.etcExpenseFiles.map(async file => {
            const [etcExpenseFileInsertResult] = await tx
              .insert(EtcExpenseFile)
              .values({
                fundingOrderId: fundingInsertResult.insertId,
                fileId: file.fileId,
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
      }

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
        tradeDetailExplanation: FundingOrder.tradeDetailExplanation,
        clubSuppliesName: FundingOrder.clubSuppliesName,
        clubSuppliesEvidenceEnumId: FundingOrder.clubSuppliesEvidenceEnumId,
        clubSuppliesClassEnumId: FundingOrder.clubSuppliesClassEnumId,
        clubSuppliesPurpose: FundingOrder.clubSuppliesPurpose,
        clubSuppliesSoftwareEvidence: FundingOrder.clubSuppliesSoftwareEvidence,
        numberOfClubSupplies: FundingOrder.numberOfClubSupplies,
        priceOfClubSupplies: FundingOrder.priceOfClubSupplies,
        isFixture: FundingOrder.isFixture,
        fixtureName: FundingOrder.fixtureName,
        fixtureEvidenceEnumId: FundingOrder.fixtureEvidenceEnumId,
        fixtureClassEnumId: FundingOrder.fixtureClassEnumId,
        fixturePurpose: FundingOrder.fixturePurpose,
        fixtureSoftwareEvidence: FundingOrder.fixtureSoftwareEvidence,
        numberOfFixture: FundingOrder.numberOfFixture,
        priceOfFixture: FundingOrder.priceOfFixture,
        isTransportation: FundingOrder.isTransportation,
        transportationEnumId: FundingOrder.transportationEnumId,
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
        isLaborContract: FundingOrder.isLaborContract,
        laborContractExplanation: FundingOrder.laborContractExplanation,
        isExternalEventParticipationFee:
          FundingOrder.isExternalEventParticipationFee,
        externalEventParticipationFeeExplanation:
          FundingOrder.externalEventParticipationFeeExplanation,
        isPublication: FundingOrder.isPublication,
        publicationExplanation: FundingOrder.publicationExplanation,
        isProfitMakingActivity: FundingOrder.isProfitMakingActivity,
        profitMakingActivityExplanation:
          FundingOrder.profitMakingActivityExplanation,
        isJointExpense: FundingOrder.isJointExpense,
        jointExpenseExplanation: FundingOrder.jointExpenseExplanation,
        isEtcExpense: FundingOrder.isEtcExpense,
        etcExpenseExplanation: FundingOrder.etcExpenseExplanation,
      })
      .from(FundingOrder)
      .leftJoin(
        FundingOrderFeedback,
        eq(FundingOrderFeedback.fundingOrderId, fundingId),
      )
      .leftJoin(
        TransportationPassenger,
        eq(TransportationPassenger.fundingOrderId, fundingId),
      )
      .leftJoin(Student, eq(Student.id, TransportationPassenger.studentId))
      .where(
        and(eq(FundingOrder.id, fundingId), isNull(FundingOrder.deletedAt)),
      );
    return result[0];
  }

  async selectPassengerStudentIdsByFundingId(
    fundingId: number,
  ): Promise<number[]> {
    const result = await this.db
      .select({ studentId: TransportationPassenger.studentId })
      .from(TransportationPassenger)
      .where(
        and(
          eq(TransportationPassenger.fundingOrderId, fundingId),
          isNull(TransportationPassenger.deletedAt),
        ),
      );
    return result.map(row => row.studentId);
  }

  async selectTradeEvidenceFileIdsByFundingId(
    fundingId: number,
  ): Promise<string[]> {
    const result = await this.db
      .select({ tradeEvidenceFileId: TradeEvidenceFile.fileId })
      .from(TradeEvidenceFile)
      .where(
        and(
          eq(TradeEvidenceFile.fundingOrderId, fundingId),
          isNull(TradeEvidenceFile.deletedAt),
        ),
      );
    return result.map(row => row.tradeEvidenceFileId);
  }

  async selectTradeDetailFileIdsByFundingId(
    fundingId: number,
  ): Promise<string[]> {
    const result = await this.db
      .select({ tradeDetailFileId: TradeDetailFile.fileId })
      .from(TradeDetailFile)
      .where(
        and(
          eq(TradeDetailFile.fundingOrderId, fundingId),
          isNull(TradeDetailFile.deletedAt),
        ),
      );
    return result.map(row => row.tradeDetailFileId);
  }

  async selectFoodExpenseFileIdsByFundingId(
    fundingId: number,
  ): Promise<string[]> {
    const result = await this.db
      .select({ foodExpenseFileId: FoodExpenseFile.fileId })
      .from(FoodExpenseFile)
      .where(
        and(
          eq(FoodExpenseFile.fundingOrderId, fundingId),
          isNull(FoodExpenseFile.deletedAt),
        ),
      );
    return result.map(row => row.foodExpenseFileId);
  }

  async selectLaborContractFileIdsByFundingId(
    fundingId: number,
  ): Promise<string[]> {
    const result = await this.db
      .select({ laborContractFileId: LaborContractFile.fileId })
      .from(LaborContractFile)
      .where(
        and(
          eq(LaborContractFile.fundingOrderId, fundingId),
          isNull(LaborContractFile.deletedAt),
        ),
      );
    return result.map(row => row.laborContractFileId);
  }

  async selectExternalEventParticipationFeeFileIdsByFundingId(
    fundingId: number,
  ): Promise<string[]> {
    const result = await this.db
      .select({
        externalEventParticipationFeeFileId:
          ExternalEventParticipationFeeFile.fileId,
      })
      .from(ExternalEventParticipationFeeFile)
      .where(
        and(
          eq(ExternalEventParticipationFeeFile.fundingOrderId, fundingId),
          isNull(ExternalEventParticipationFeeFile.deletedAt),
        ),
      );
    return result.map(row => row.externalEventParticipationFeeFileId);
  }

  async selectPublicationFileIdsByFundingId(
    fundingId: number,
  ): Promise<string[]> {
    const result = await this.db
      .select({ publicationFileId: PublicationFile.fileId })
      .from(PublicationFile)
      .where(
        and(
          eq(PublicationFile.fundingOrderId, fundingId),
          isNull(PublicationFile.deletedAt),
        ),
      );
    return result.map(row => row.publicationFileId);
  }

  async selectProfitMakingActivityFileIdsByFundingId(
    fundingId: number,
  ): Promise<string[]> {
    const result = await this.db
      .select({ profitMakingActivityFileId: ProfitMakingActivityFile.fileId })
      .from(ProfitMakingActivityFile)
      .where(
        and(
          eq(ProfitMakingActivityFile.fundingOrderId, fundingId),
          isNull(ProfitMakingActivityFile.deletedAt),
        ),
      );
    return result.map(row => row.profitMakingActivityFileId);
  }

  async selectJointExpenseFileIdsByFundingId(
    fundingId: number,
  ): Promise<string[]> {
    const result = await this.db
      .select({ jointExpenseFileId: JointExpenseFile.fileId })
      .from(JointExpenseFile)
      .where(
        and(
          eq(JointExpenseFile.fundingOrderId, fundingId),
          isNull(JointExpenseFile.deletedAt),
        ),
      );
    return result.map(row => row.jointExpenseFileId);
  }

  async selectEtcExpenseFileIdsByFundingId(
    fundingId: number,
  ): Promise<string[]> {
    const result = await this.db
      .select({ etcExpenseFileId: EtcExpenseFile.fileId })
      .from(EtcExpenseFile)
      .where(
        and(
          eq(EtcExpenseFile.fundingOrderId, fundingId),
          isNull(EtcExpenseFile.deletedAt),
        ),
      );
    return result.map(row => row.etcExpenseFileId);
  }

  async selectClubSuppliesImageFileIdsByFundingId(
    fundingId: number,
  ): Promise<string[]> {
    const result = await this.db
      .select({ clubSuppliesImageFileId: ClubSuppliesImageFile.fileId })
      .from(ClubSuppliesImageFile)
      .where(
        and(
          eq(ClubSuppliesImageFile.fundingOrderId, fundingId),
          isNull(ClubSuppliesImageFile.deletedAt),
        ),
      );
    return result.map(row => row.clubSuppliesImageFileId);
  }

  async selectClubSuppliesSoftwareEvidenceFileIdsByFundingId(
    fundingId: number,
  ): Promise<string[]> {
    const result = await this.db
      .select({
        clubSuppliesSoftwareEvidenceFileId:
          ClubSuppliesSoftwareEvidenceFile.fileId,
      })
      .from(ClubSuppliesSoftwareEvidenceFile)
      .where(
        and(
          eq(ClubSuppliesSoftwareEvidenceFile.fundingOrderId, fundingId),
          isNull(ClubSuppliesSoftwareEvidenceFile.deletedAt),
        ),
      );
    return result.map(row => row.clubSuppliesSoftwareEvidenceFileId);
  }

  async selectFixtureImageFileIdsByFundingId(
    fundingId: number,
  ): Promise<string[]> {
    const result = await this.db
      .select({ fixtureImageFileId: FixtureImageFile.fileId })
      .from(FixtureImageFile)
      .where(
        and(
          eq(FixtureImageFile.fundingOrderId, fundingId),
          isNull(FixtureImageFile.deletedAt),
        ),
      );
    return result.map(row => row.fixtureImageFileId);
  }

  async selectFixtureSoftwareEvidenceFileIdsByFundingId(
    fundingId: number,
  ): Promise<string[]> {
    const result = await this.db
      .select({
        fixtureSoftwareEvidenceFileId: FixtureSoftwareEvidenceFile.fileId,
      })
      .from(FixtureSoftwareEvidenceFile)
      .where(
        and(
          eq(FixtureSoftwareEvidenceFile.fundingOrderId, fundingId),
          isNull(FixtureSoftwareEvidenceFile.deletedAt),
        ),
      );
    return result.map(row => row.fixtureSoftwareEvidenceFileId);
  }

  async putStudentFunding(
    contents: {
      clubId: number;
      purposeId?: number;
      name: string;
      expenditureDate: Date;
      expenditureAmount: number;

      tradeEvidenceFiles: Array<{ fileId: string }>;
      tradeDetailFiles: Array<{ fileId: string }>;
      tradeDetailExplanation: string;

      clubSuppliesName?: string;
      clubSuppliesEvidenceEnumId?: number;
      clubSuppliesClassEnumId?: number;
      clubSuppliesPurpose?: string;
      clubSuppliesImageFiles?: Array<{ fileId: string }>;
      clubSuppliesSoftwareEvidence?: string;
      clubSuppliesSoftwareEvidenceFiles?: Array<{ fileId: string }>;
      numberOfClubSupplies?: number;
      priceOfClubSupplies?: number;

      isFixture: boolean;
      fixtureName?: string;
      fixtureEvidenceEnumId?: number;
      fixtureClassEnumId?: number;
      fixturePurpose?: string;
      fixtureImageFiles: Array<{ fileId: string }>;
      fixtureSoftwareEvidence?: string;
      fixtureSoftwareEvidenceFiles: Array<{ fileId: string }>;
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
      foodExpenseFiles: Array<{ fileId: string }>;

      isLaborContract: boolean;
      laborContractExplanation?: string;
      laborContractFiles: Array<{ fileId: string }>;

      isExternalEventParticipationFee: boolean;
      externalEventParticipationFeeExplanation?: string;
      externalEventParticipationFeeFiles: Array<{ fileId: string }>;

      isPublication: boolean;
      publicationExplanation?: string;
      publicationFiles: Array<{ fileId: string }>;

      isProfitMakingActivity: boolean;
      profitMakingActivityExplanation?: string;
      profitMakingActivityFiles: Array<{ fileId: string }>;

      isJointExpense: boolean;
      jointExpenseExplanation?: string;
      jointExpenseFiles: Array<{ fileId: string }>;

      isEtcExpense: boolean;
      etcExpenseExplanation?: string;
      etcExpenseFiles: Array<{ fileId: string }>;
    },
    fundingId: number,
    semesterId: number,
  ): Promise<boolean> {
    const isUpdateSucceed = await this.db.transaction(async tx => {
      const deletedAt = new Date();
      const [fundingUpdateResult] = await tx
        .update(FundingOrder)
        .set({
          clubId: contents.clubId,
          purposeId: contents.purposeId,
          semesterId,
          fundingOrderStatusEnumId: Number(FundingOrderStatusEnum.Applied),
          name: contents.name,
          expenditureDate: contents.expenditureDate,
          expenditureAmount: contents.expenditureAmount,
          tradeDetailExplanation: contents.tradeDetailExplanation,
          clubSuppliesName:
            contents.purposeId !== undefined ? contents.clubSuppliesName : null,
          clubSuppliesEvidenceEnumId:
            contents.purposeId !== undefined
              ? contents.clubSuppliesEvidenceEnumId
              : null,
          clubSuppliesClassEnumId:
            contents.purposeId !== undefined
              ? contents.clubSuppliesClassEnumId
              : null,
          clubSuppliesPurpose:
            contents.purposeId !== undefined
              ? contents.clubSuppliesPurpose
              : null,
          clubSuppliesSoftwareEvidence:
            contents.purposeId !== undefined &&
            contents.clubSuppliesClassEnumId === FixtureClassEnum.Software
              ? contents.clubSuppliesSoftwareEvidence
              : null,
          numberOfClubSupplies:
            contents.purposeId !== undefined
              ? contents.numberOfClubSupplies
              : null,
          priceOfClubSupplies:
            contents.purposeId !== undefined
              ? contents.priceOfClubSupplies
              : null,
          isFixture: contents.isFixture,
          fixtureName: contents.isFixture ? contents.fixtureName : null,
          fixtureEvidenceEnumId: contents.isFixture
            ? contents.fixtureEvidenceEnumId
            : null,
          fixtureClassEnumId: contents.isFixture
            ? contents.fixtureClassEnumId
            : null,
          fixturePurpose: contents.isFixture ? contents.fixturePurpose : null,
          fixtureSoftwareEvidence:
            contents.isFixture &&
            contents.fixtureClassEnumId === FixtureClassEnum.Software
              ? contents.fixtureSoftwareEvidence
              : null,
          numberOfFixture: contents.isFixture ? contents.numberOfFixture : null,
          priceOfFixture: contents.isFixture ? contents.priceOfFixture : null,
          isTransportation: contents.isTransportation,
          transportationEnumId: contents.isTransportation
            ? contents.transportationEnumId
            : null,
          origin: contents.isTransportation ? contents.origin : null,
          destination: contents.isTransportation ? contents.destination : null,
          purposeOfTransportation: contents.isTransportation
            ? contents.purposeOfTransportation
            : null,
          placeValidity:
            contents.isTransportation &&
            contents.transportationEnumId ===
              (TransportationEnum.Cargo ||
                TransportationEnum.CallVan ||
                TransportationEnum.Airplane ||
                TransportationEnum.Ship ||
                TransportationEnum.Others)
              ? contents.placeValidity
              : null,
          isNonCorporateTransaction: contents.isNonCorporateTransaction,
          traderName: contents.isNonCorporateTransaction
            ? contents.traderName
            : null,
          traderAccountNumber: contents.isNonCorporateTransaction
            ? contents.traderAccountNumber
            : null,
          wasteExplanation: contents.isNonCorporateTransaction
            ? contents.wasteExplanation
            : null,
          isFoodExpense: contents.isFoodExpense,
          foodExpenseExplanation: contents.isFoodExpense
            ? contents.foodExpenseExplanation
            : null,
          isLaborContract: contents.isLaborContract,
          laborContractExplanation: contents.isLaborContract
            ? contents.laborContractExplanation
            : null,
          isExternalEventParticipationFee:
            contents.isExternalEventParticipationFee,
          externalEventParticipationFeeExplanation:
            contents.isExternalEventParticipationFee
              ? contents.externalEventParticipationFeeExplanation
              : null,
          isPublication: contents.isPublication,
          publicationExplanation: contents.isPublication
            ? contents.publicationExplanation
            : null,
          isProfitMakingActivity: contents.isProfitMakingActivity,
          profitMakingActivityExplanation: contents.isProfitMakingActivity
            ? contents.profitMakingActivityExplanation
            : null,
          isJointExpense: contents.isJointExpense,
          jointExpenseExplanation: contents.isJointExpense
            ? contents.jointExpenseExplanation
            : null,
          isEtcExpense: contents.isEtcExpense,
          etcExpenseExplanation: contents.isEtcExpense
            ? contents.etcExpenseExplanation
            : null,
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
      if (
        contents.isTransportation &&
        contents.transportationEnumId ===
          (TransportationEnum.Taxi ||
            TransportationEnum.CallVan ||
            TransportationEnum.CharterBus ||
            TransportationEnum.Airplane ||
            TransportationEnum.Ship ||
            TransportationEnum.Others)
      ) {
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
      }

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
              fileId: file.fileId,
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
        .update(TradeDetailFile)
        .set({ deletedAt })
        .where(
          and(
            eq(TradeDetailFile.fundingOrderId, fundingId),
            isNull(TradeDetailFile.deletedAt),
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
            .insert(TradeDetailFile)
            .values({
              fundingOrderId: fundingId,
              fileId: file.fileId,
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
      if (contents.purposeId !== undefined) {
        await Promise.all(
          contents.clubSuppliesImageFiles.map(async file => {
            const [clubSuppliesImageFileInsertResult] = await tx
              .insert(ClubSuppliesImageFile)
              .values({
                fundingOrderId: fundingId,
                fileId: file.fileId,
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
      }

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
      if (
        contents.purposeId !== undefined &&
        contents.clubSuppliesClassEnumId === FixtureClassEnum.Software
      ) {
        await Promise.all(
          contents.clubSuppliesSoftwareEvidenceFiles.map(async file => {
            const [clubSuppliesSoftwareEvidenceFileInsertResult] = await tx
              .insert(ClubSuppliesSoftwareEvidenceFile)
              .values({
                fundingOrderId: fundingId,
                fileId: file.fileId,
              });
            if (
              clubSuppliesSoftwareEvidenceFileInsertResult.affectedRows !== 1
            ) {
              logger.debug(
                "[putStudentFunding] clubSuppliesSoftwareEvidenceFile insert failed. Rollback occurs",
              );
              tx.rollback();
              return false;
            }
            return {};
          }),
        );
      }

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
      if (contents.isFixture) {
        await Promise.all(
          contents.fixtureImageFiles.map(async file => {
            const [fixtureImageFileInsertResult] = await tx
              .insert(FixtureImageFile)
              .values({
                fundingOrderId: fundingId,
                fileId: file.fileId,
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
      }

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
      if (
        contents.isFixture &&
        contents.fixtureClassEnumId === FixtureClassEnum.Software
      ) {
        await Promise.all(
          contents.fixtureSoftwareEvidenceFiles.map(async file => {
            const [fixtureSoftwareEvidenceFileInsertResult] = await tx
              .insert(FixtureSoftwareEvidenceFile)
              .values({
                fundingOrderId: fundingId,
                fileId: file.fileId,
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
      }

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
      if (contents.isFoodExpense) {
        await Promise.all(
          contents.foodExpenseFiles.map(async file => {
            const [foodExpenseFileInsertResult] = await tx
              .insert(FoodExpenseFile)
              .values({
                fundingOrderId: fundingId,
                fileId: file.fileId,
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
      }

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
      if (contents.isLaborContract) {
        await Promise.all(
          contents.laborContractFiles.map(async file => {
            const [laborContractFileInsertResult] = await tx
              .insert(LaborContractFile)
              .values({
                fundingOrderId: fundingId,
                fileId: file.fileId,
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
      }

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
      if (contents.isExternalEventParticipationFee) {
        await Promise.all(
          contents.externalEventParticipationFeeFiles.map(async file => {
            const [externalEventParticipationFeeFileInsertResult] = await tx
              .insert(ExternalEventParticipationFeeFile)
              .values({
                fundingOrderId: fundingId,
                fileId: file.fileId,
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
      }

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
      if (contents.isPublication) {
        await Promise.all(
          contents.publicationFiles.map(async file => {
            const [publicationFileInsertResult] = await tx
              .insert(PublicationFile)
              .values({
                fundingOrderId: fundingId,
                fileId: file.fileId,
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
      }

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
      if (contents.isProfitMakingActivity) {
        await Promise.all(
          contents.profitMakingActivityFiles.map(async file => {
            const [profitMakingActivityFileInsertResult] = await tx
              .insert(ProfitMakingActivityFile)
              .values({
                fundingOrderId: fundingId,
                fileId: file.fileId,
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
      }

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
      if (contents.isJointExpense) {
        await Promise.all(
          contents.jointExpenseFiles.map(async file => {
            const [jointExpenseFileInsertResult] = await tx
              .insert(JointExpenseFile)
              .values({
                fundingOrderId: fundingId,
                fileId: file.fileId,
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
      }

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
      if (contents.isEtcExpense) {
        await Promise.all(
          contents.etcExpenseFiles.map(async file => {
            const [etcExpenseFileInsertResult] = await tx
              .insert(EtcExpenseFile)
              .values({
                fundingOrderId: fundingId,
                fileId: file.fileId,
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
      }

      return true;
    });

    return isUpdateSucceed;
  }

  async deleteStudentFunding(fundingId: number): Promise<boolean> {
    const isDeletionSucceed = await this.db.transaction(async tx => {
      const deletedAt = getKSTDate();
      const funding = await tx
        .select({
          isFoodExpense: FundingOrder.isFoodExpense,
          isLaborContract: FundingOrder.isLaborContract,
          isExternalEventParticipationFee:
            FundingOrder.isExternalEventParticipationFee,
          isPublication: FundingOrder.isPublication,
          isProfitMakingActivity: FundingOrder.isProfitMakingActivity,
          isJointExpense: FundingOrder.isJointExpense,
          isEtcExpense: FundingOrder.isEtcExpense,
          isTransportation: FundingOrder.isTransportation,
          transportationEnumId: FundingOrder.transportationEnumId,
          isNonCorporateTransaction: FundingOrder.isNonCorporateTransaction,
          isFixture: FundingOrder.isFixture,
          fixtureClassEnumId: FundingOrder.fixtureClassEnumId,
          clubSuppliesClassEnumId: FundingOrder.clubSuppliesClassEnumId,
          purposeId: FundingOrder.purposeId,
        })
        .from(FundingOrder)
        .where(
          and(eq(FundingOrder.id, fundingId), isNull(FundingOrder.deletedAt)),
        );
      if (funding.length !== 1) {
        logger.debug("[deleteFunding] rollback occurs");
        tx.rollback();
        return false;
      }

      if (funding[0].isFoodExpense) {
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
      }

      if (funding[0].isLaborContract) {
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
      }

      if (funding[0].isExternalEventParticipationFee) {
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
      }

      if (funding[0].isPublication) {
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
      }

      if (funding[0].isProfitMakingActivity) {
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
      }

      if (funding[0].isJointExpense) {
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
      }

      if (funding[0].isEtcExpense) {
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
      }

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

      const [tradeDetailFileDeletionResult] = await tx
        .update(TradeDetailFile)
        .set({ deletedAt })
        .where(
          and(
            eq(TradeDetailFile.fundingOrderId, fundingId),
            isNull(TradeDetailFile.deletedAt),
          ),
        );
      if (tradeDetailFileDeletionResult.affectedRows < 1) {
        logger.debug(
          "[deleteFunding] tradeDetailFile deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }

      if (funding[0].purposeId !== undefined) {
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
      }

      if (
        funding[0].purposeId !== undefined &&
        funding[0].clubSuppliesClassEnumId === FixtureClassEnum.Software
      ) {
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
      }

      if (funding[0].isFixture) {
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
      }

      if (
        funding[0].isFixture &&
        funding[0].fixtureClassEnumId === FixtureClassEnum.Software
      ) {
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
      }

      if (
        funding[0].isTransportation &&
        funding[0].transportationEnumId ===
          (TransportationEnum.Taxi ||
            TransportationEnum.CallVan ||
            TransportationEnum.CharterBus ||
            TransportationEnum.Airplane ||
            TransportationEnum.Ship ||
            TransportationEnum.Others)
      ) {
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
      }

      const [fundingDeletionResult] = await tx
        .update(FundingOrder)
        .set({ deletedAt })
        .where(
          and(eq(FundingOrder.id, fundingId), isNull(FundingOrder.deletedAt)),
        );
      if (fundingDeletionResult.affectedRows !== 1) {
        logger.debug(
          "[deleteFunding] funding deletion failed. Rollback occurs",
        );
        tx.rollback();
        return false;
      }

      return true;
    });
    return isDeletionSucceed;
  }

  async selectFundingsSemesterByClubId(clubId: number, semesterId: number) {
    const result = await this.db
      .select({
        id: FundingOrder.id,
        purposeId: FundingOrder.purposeId,
        fundingOrderStatusEnumId: FundingOrder.fundingOrderStatusEnumId,
        name: FundingOrder.name,
        expenditureAmount: FundingOrder.expenditureAmount,
        approvedAmount: FundingOrder.approvedAmount,
      })
      .from(FundingOrder)
      .where(
        and(
          eq(FundingOrder.clubId, clubId),
          eq(FundingOrder.semesterId, semesterId),
          isNull(FundingOrder.deletedAt),
        ),
      );
    return result;
  }
}
