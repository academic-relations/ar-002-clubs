import { Inject, Injectable } from "@nestjs/common";

import { count, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { Club } from "@sparcs-clubs/api/drizzle/schema/club.schema";
// eslint-disable-next-line import/no-duplicates
import {
  RentalEnum,
  RentalObject,
  RentalOrder,
  RentalOrderItemD,
} from "@sparcs-clubs/api/drizzle/schema/rental.schema";
import { Student } from "@sparcs-clubs/api/drizzle/schema/user.schema";

// eslint-disable-next-line import/no-duplicates

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

@Injectable()
export class RentalOrderRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async getRental(rentalId: number) {
    const rental = await this.db
      .select({
        id: RentalOrder.id,
        clubId: RentalOrder.clubId,
        clubName: Club.name,
        studentName: Student.name,
        studentPhoneNumber: RentalOrder.studentPhoneNumber,
        purpose: RentalOrder.purpose,
        desiredStart: RentalOrder.desiredStart,
        desiredEnd: RentalOrder.desiredEnd,
        startTerm: RentalOrderItemD.startTerm,
        endTerm: RentalOrderItemD.endTerm,
      })
      .from(RentalOrder)
      .leftJoin(Student, eq(RentalOrder.studentId, Student.id))
      .leftJoin(Club, eq(RentalOrder.clubId, Club.id))
      .leftJoin(
        RentalOrderItemD,
        eq(RentalOrder.id, RentalOrderItemD.rentalOrderId),
      )
      .where(eq(RentalOrder.id, rentalId))
      .limit(1);

    // RentalObject 정보 가져오기
    const objects = await this.db
      .select({
        id: RentalObject.rentalEnum,
        name: RentalEnum.typeName,
        number: count(RentalObject.id),
      })
      .from(RentalOrderItemD)
      .leftJoin(RentalObject, eq(RentalOrderItemD.objectId, RentalObject.id))
      .leftJoin(RentalEnum, eq(RentalObject.rentalEnum, RentalEnum.id))
      .groupBy(RentalObject.rentalEnum)
      .where(eq(RentalOrderItemD.rentalOrderId, rentalId));

    return { ...rental[0], objects };
  }

  async getRentalsMy(
    page: number,
    pageSize: number,
    // startDate?: Date,
    // endDate?: Date
  ) {
    // TODO: startDate, endDate를 이용하여 필터링
    // TODO: startDate, endDate에 따라 statusEnum을 다르게 설정
    const myOrders = await this.db
      .select({
        id: RentalOrder.id,
        studentName: Student.name,
        purpose: RentalOrder.purpose,
        desiredStart: RentalOrder.desiredStart,
        desiredEnd: RentalOrder.desiredEnd,
        startTerm: RentalOrderItemD.startTerm,
        endTerm: RentalOrderItemD.endTerm,
        createdAt: RentalOrder.createdAt,
      })
      .from(RentalOrder)
      .leftJoin(Student, eq(RentalOrder.studentId, Student.id))
      .leftJoin(Club, eq(RentalOrder.clubId, Club.id))
      .leftJoin(
        RentalOrderItemD,
        eq(RentalOrder.id, RentalOrderItemD.rentalOrderId),
      )
      .groupBy(
        RentalOrder.id,
        RentalOrderItemD.startTerm,
        RentalOrderItemD.endTerm,
      )
      .where(eq(RentalOrder.studentId, 1));

    const myNewOrders = await Promise.all(
      myOrders.map(async order => {
        const objects = await this.db
          .select({
            id: RentalEnum.id,
            name: RentalEnum.typeName,
            number: count(RentalObject.id),
          })
          .from(RentalOrderItemD)
          .leftJoin(
            RentalObject,
            eq(RentalOrderItemD.objectId, RentalObject.id),
          )
          .leftJoin(RentalEnum, eq(RentalObject.rentalEnum, RentalEnum.id))
          .groupBy(RentalObject.rentalEnum)
          .where(eq(RentalOrderItemD.rentalOrderId, order.id));
        return { ...order, objects, statusEnum: 1 };
      }),
    );
    const startIndex = (page - 1) * pageSize;
    const total = myNewOrders.length;
    const paginatedOrders = myNewOrders.slice(
      startIndex,
      startIndex + pageSize,
    );

    return { paginatedOrders, total };
  }
}
