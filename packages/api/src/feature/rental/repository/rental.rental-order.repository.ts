import { Inject, Injectable } from "@nestjs/common";

import { count, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { Club } from "@sparcs-clubs/api/drizzle/schema/club.schema";
import {
  RentalEnum,
  RentalObject,
  RentalOrder,
  RentalOrderItemD,
} from "@sparcs-clubs/api/drizzle/schema/rental.schema";
import { Student } from "@sparcs-clubs/api/drizzle/schema/user.schema";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

@Injectable()
export class RentalOrderRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async getRental(rentalId: number) {
    const rental = await this.db
      .select({
        id: RentalOrder.id,
        clubId: RentalOrder.clubId,
        clubNameKR: Club.name_kr,
        clubNameEN: Club.name_en,
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

    // rental id 에 해당하는 (rental enum, number)[] 정보 가져오기
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
}
