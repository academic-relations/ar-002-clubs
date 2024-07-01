import { Injectable, Inject } from "@nestjs/common";
import { eq, or, gt, lt, count } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import {
  RentalEnum,
  RentalObject,
  RentalOrder,
  RentalOrderItemD,
} from "src/drizzle/schema/rental.schema";

@Injectable()
export class RentalObjectRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  // RNT-001 에서 사용됨.
  async getAvailableRentals(desiredStart: Date, desiredEnd: Date) {
    const availableObjects = await this.db
      .select({
        id: RentalObject.rentalEnum,
        name: RentalEnum.typeName,
        maximum: count(RentalObject.rentalEnum),
      })
      .from(RentalObject)
      .leftJoin(
        RentalOrderItemD,
        eq(RentalOrderItemD.objectId, RentalObject.id),
      )
      .leftJoin(RentalOrder, eq(RentalOrder.id, RentalOrderItemD.rentalOrderId))
      .leftJoin(RentalEnum, eq(RentalObject.rentalEnum, RentalEnum.id))
      .where(
        or(
          gt(RentalOrder.desiredStart, desiredEnd),
          RentalOrderItemD.endTerm !== undefined
            ? undefined
            : lt(RentalOrder.desiredEnd, desiredEnd),
        ),
      )
      .groupBy(RentalObject.id);
    return availableObjects;
  }

  async useGetAvailableRentalObjectIds(desiredStart: Date, desiredEnd: Date) {
    const objectIds = this.db
      .select({
        id: RentalObject.id,
        rentalEnum: RentalObject.rentalEnum,
      })
      .from(RentalObject)
      .leftJoin(
        RentalOrderItemD,
        eq(RentalOrderItemD.objectId, RentalObject.id),
      )
      .leftJoin(RentalOrder, eq(RentalOrder.id, RentalOrderItemD.rentalOrderId))
      .where(
        or(
          gt(RentalOrder.desiredStart, desiredEnd),
          RentalOrderItemD.endTerm !== undefined
            ? undefined
            : lt(RentalOrder.desiredEnd, desiredEnd),
        ),
      );
    return objectIds;
  }
}
