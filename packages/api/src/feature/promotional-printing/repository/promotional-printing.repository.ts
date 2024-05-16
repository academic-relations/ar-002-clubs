import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { and, count, desc, eq, gte, lte } from "drizzle-orm";
import { Student, User } from "@sparcs-clubs/api/drizzle/schema/user.schema";
import {
  PromotionalPrintingOrder,
  PromotionalPrintingOrderSize,
} from "src/drizzle/schema/promotional-printing.schema";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

import type {
  FindPromotionalPrintingOrderSizeBypromotionalPrintingOrderIdReturn,
  GetStudentPromotionalPrintingsOrdersReturn,
} from "../dto/promotional-printing.dto";

@Injectable()
export class PromotionalPrintingRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async countByCreatedAtIn(startDate?: Date, endDate?: Date): Promise<number> {
    const numberOfOrders = (
      await this.db
        .select({ count: count() })
        .from(PromotionalPrintingOrder)
        .where(
          and(
            startDate !== undefined
              ? gte(PromotionalPrintingOrder.createdAt, startDate)
              : undefined,
            endDate !== undefined
              ? lte(PromotionalPrintingOrder.createdAt, endDate)
              : undefined,
          ),
        )
    ).at(0).count;

    return numberOfOrders;
  }

  async getStudentPromotionalPrintingsOrders(
    clubId: number,
    pageOffset: number,
    itemCount: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<GetStudentPromotionalPrintingsOrdersReturn> {
    const startIndex = (pageOffset - 1) * itemCount + 1;
    const orders = await this.db
      .select({
        id: PromotionalPrintingOrder.id,
        studentName: User.name,
        status: PromotionalPrintingOrder.promotionalPrintingOrderStatusEnum,
        desiredPickUpDate: PromotionalPrintingOrder.desiredPickUpTime,
        pickUpTime: PromotionalPrintingOrder.pickUpAt,
        createdAt: PromotionalPrintingOrder.createdAt,
      })
      .from(PromotionalPrintingOrder)
      .leftJoin(Student, eq(PromotionalPrintingOrder.studentId, Student.id))
      .leftJoin(User, eq(Student.userId, User.id))
      .where(
        and(
          startDate !== undefined
            ? gte(PromotionalPrintingOrder.createdAt, startDate)
            : undefined,
          endDate !== undefined
            ? lte(PromotionalPrintingOrder.createdAt, endDate)
            : undefined,
        ),
      )
      .orderBy(desc(PromotionalPrintingOrder.createdAt))
      .limit(itemCount)
      .offset(startIndex - 1);

    return orders;
  }

  async findPromotionalPrintingOrderSizeBypromotionalPrintingOrderId(
    promotionalPrintingOrderId: number,
  ): Promise<FindPromotionalPrintingOrderSizeBypromotionalPrintingOrderIdReturn> {
    const orderSize = await this.db
      .select({
        promotionalPrintingSizeEnum:
          PromotionalPrintingOrderSize.promotionalPrintingSizeEnumId,
        numberOfPrints: PromotionalPrintingOrderSize.numberOfPrints,
      })
      .from(PromotionalPrintingOrderSize)
      .where(
        eq(
          PromotionalPrintingOrderSize.promotionalPrintingOrderId,
          promotionalPrintingOrderId,
        ),
      );

    return orderSize;
  }
}
