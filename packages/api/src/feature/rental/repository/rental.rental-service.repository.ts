import { Injectable, Inject } from "@nestjs/common";
// import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";
import { eq, gte, lte, and, count } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import {
  RentalEnum,
  RentalObject,
  RentalOrder,
  RentalOrderItemD,
} from "src/drizzle/schema/rental.schema";
import { Student } from "src/drizzle/schema/user.schema";

@Injectable()
export class RentalServiceRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  // async createRental(
  //   studentId,
  //   clubId,
  //   objects,
  //   purpose,
  //   desiredStart,
  //   desiredEnd,
  //   studentPhoneNumber
  // ) {
  //   try {
  //     const availableObjectIds = await Promise.all(
  //       objects.map(async object => {
  //         const result = await this.db
  //           .select({
  //             rentalEnumid: RentalObject.rentalEnum,
  //             id: RentalObject.id,
  //           })
  //           .from(RentalObject)
  //           .leftJoin(RentalEnum, eq(RentalObject.rentalEnum, RentalEnum.id))
  //           .leftJoin(
  //             RentalOrderItemD,
  //             eq(RentalOrderItemD.objectId, RentalObject.id),
  //           )
  //           .leftJoin(RentalOrder, eq(RentalOrder.id, RentalOrderItemD.rentalOrderId))
  //           .where(
  //             or(
  //               RentalOrder.desiredStart ? gt(RentalOrder.desiredStart, desiredEnd) : undefined,
  //               RentalOrder.desiredEnd ? lt(RentalOrder.desiredEnd, desiredStart) : undefined,
  //             ),
  //           )
  //           .limit(object.number);
  //         return result;
  //       })
  //     );
  //     console.log(availableObjectIds);
  //     if (availableObjectIds.length === 0) {
  //       throw new HttpException('There are no available objects', 404);
  //     }
  //     const filteredAvailableObjectIds = availableObjectIds.map(item => {item.id;});
  //     if (filteredAvailableObjectIds.length === 0) {
  //       throw new HttpException('There are no available objects', 404);
  //     }
  //   } catch (error) {
  //     console.error('Error creating rental:', error);
  //     throw new HttpException('Error creating rental', 500);
  //   }

  //     // 3. If available, create a rental order

  //     // await this.db.transaction(async tx => {
  //     //   const result = await tx.insert(RentalOrder).values({
  //     //     clubId,
  //     //     studentId,
  //     //     studentPhoneNumber,
  //     //     purpose,
  //     //     desiredStart,
  //     //     desiredEnd,
  //     //   })
  //     //  filteredAvailableObjectIds.forEach(async objectId => {
  //     //       await tx.insert(RentalOrderItemD).values({
  //     //         rentalOrderId: result[0].insertId,
  //     //         objectId: objectId,
  //     //       });
  //     //     });
  //     //   }
  //     // );

  // }

  // 1. 동아리의 특정 기간 내의 모든 주문 건을 찾습니다.
  async getRentals(
    clubId,
    pageOffset,
    itemCount,
    startDate?: Date,
    endDate?: Date,
  ) {
    const startIndex = (pageOffset - 1) * itemCount + 1;
    const rentals = await this.db
      .select({
        id: RentalOrder.id,
        studentName: Student.name,
        studentPhoneNumber: RentalOrder.studentPhoneNumber,
        object: {
          id: RentalEnum.id,
          name: RentalEnum.typeName,
          count: count(RentalEnum.id),
        },
        startDate: RentalOrderItemD.startTerm,
        endDate: RentalOrderItemD.endTerm,
        createdAt: RentalOrder.createdAt,
      })
      .from(RentalOrder)
      .leftJoin(
        RentalOrderItemD,
        eq(RentalOrderItemD.rentalOrderId, RentalOrder.id),
      )
      .leftJoin(RentalObject, eq(RentalObject.id, RentalOrderItemD.objectId))
      .leftJoin(RentalEnum, eq(RentalEnum.id, RentalObject.rentalEnum))
      .leftJoin(Student, eq(Student.id, RentalOrder.studentId))
      .where(
        and(
          eq(RentalOrder.clubId, clubId),
          startDate ? gte(RentalOrderItemD.startTerm, startDate) : undefined,
          endDate ? lte(RentalOrderItemD.endTerm, endDate) : undefined,
        ),
      )
      .groupBy(
        RentalOrder.id,
        RentalEnum.id,
        RentalOrderItemD.startTerm,
        RentalOrderItemD.endTerm,
      )
      .limit(itemCount)
      .offset(startIndex - 1);

    const transformedRentals = rentals.reduce((acc, rental) => {
      const existingRental = acc.find(
        r =>
          r.id === rental.id &&
          r.studentName === rental.studentName &&
          r.studentPhoneNumber === rental.studentPhoneNumber &&
          r.startDate === rental.startDate &&
          r.endDate === rental.endDate &&
          r.createdAt === rental.createdAt,
      );

      if (existingRental) {
        existingRental.objects.push(rental.object);
      } else {
        acc.push({
          id: rental.id,
          studentName: rental.studentName,
          studentPhoneNumber: rental.studentPhoneNumber,
          startDate: rental.startDate,
          endDate: rental.endDate,
          objects: [rental.object],
        });
      }

      return acc;
    }, []);

    return transformedRentals;
  }
}
