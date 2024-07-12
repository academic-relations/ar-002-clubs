import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { PromotionalPrintingOrderSize } from "src/drizzle/schema/promotional-printing.schema";

import type { FindPromotionalPrintingOrderSizeBypromotionalPrintingOrderIdReturn } from "../dto/promotional-printing.dto";

@Injectable()
export class PromotionalPrintingOrderSizeRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findPromotionalPrintingOrderSizeByPromotionalPrintingOrderId(
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
