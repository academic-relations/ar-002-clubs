import { Injectable, Inject } from "@nestjs/common";
import { sql, eq, or, gte, lte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import {
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
        name: RentalObject.objectName,
        maximum: sql<number>`cast(count(${RentalObject.id}) as int)`,
      })
      .from(RentalObject)
      .leftJoin(
        RentalOrderItemD,
        eq(RentalOrderItemD.objectId, RentalObject.id),
      )
      .where(
        or(
          gte(RentalOrderItemD.startTerm, endDate),
          lte(RentalOrderItemD.endTerm, startDate),
        ),
      )
      .groupBy(RentalObject.rentalEnum);

    return availableObjects;
  }
}
