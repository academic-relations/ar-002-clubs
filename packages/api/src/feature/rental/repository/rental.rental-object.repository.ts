import { Inject, Injectable } from "@nestjs/common";
import { count, eq, gt, lt, or } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import {
  RentalEnum,
  RentalObject,
  RentalOrderItemD,
} from "src/drizzle/schema/rental.schema";

@Injectable()
export class RentalObjectRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async getAvailableRentals(startDate: Date, endDate: Date) {
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
      .leftJoin(RentalEnum, eq(RentalObject.rentalEnum, RentalEnum.id))
      .where(
        or(
          gt(RentalOrderItemD.startTerm, endDate),
          lt(RentalOrderItemD.endTerm, startDate),
        ),
      )
      .groupBy(RentalObject.rentalEnum);

    return { objects: availableObjects };
  }
}
