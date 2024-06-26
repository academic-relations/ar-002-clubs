import { Inject, Injectable } from "@nestjs/common";
import { and, count, desc, eq, gte, lte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { Student } from "@sparcs-clubs/api/drizzle/schema/user.schema";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { PromotionalPrintingOrder } from "src/drizzle/schema/promotional-printing.schema";

import type {
  GetStudentPromotionalPrintingsOrdersMyReturn,
  GetStudentPromotionalPrintingsOrdersReturn,
} from "../dto/promotional-printing.dto";

@Injectable()
export class PromotionalPrintingOrderRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async countByStudentIdAndCreatedAtIn(
    studentId: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<number> {
    const numberOfOrders = (
      await this.db
        .select({ count: count() })
        .from(PromotionalPrintingOrder)
        .where(
          and(
            eq(PromotionalPrintingOrder.studentId, studentId),
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
        studentName: Student.name,
        status: PromotionalPrintingOrder.promotionalPrintingOrderStatusEnum,
        desiredPickUpDate: PromotionalPrintingOrder.desiredPickUpTime,
        pickUpTime: PromotionalPrintingOrder.pickUpAt,
        createdAt: PromotionalPrintingOrder.createdAt,
      })
      .from(PromotionalPrintingOrder)
      .leftJoin(Student, eq(PromotionalPrintingOrder.studentId, Student.id))
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

  async getStudentPromotionalPrintingsOrdersMy(
    studentId: number,
    pageOffset: number,
    itemCount: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<GetStudentPromotionalPrintingsOrdersMyReturn> {
    const startIndex = (pageOffset - 1) * itemCount + 1;
    const orders = await this.db
      .select({
        id: PromotionalPrintingOrder.id,
        studentName: Student.name,
        status: PromotionalPrintingOrder.promotionalPrintingOrderStatusEnum,
        desiredPickUpDate: PromotionalPrintingOrder.desiredPickUpTime,
        pickUpTime: PromotionalPrintingOrder.pickUpAt,
        createdAt: PromotionalPrintingOrder.createdAt,
      })
      .from(PromotionalPrintingOrder)
      .leftJoin(Student, eq(PromotionalPrintingOrder.studentId, Student.id))
      .where(
        and(
          eq(PromotionalPrintingOrder.studentId, studentId),
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
}
