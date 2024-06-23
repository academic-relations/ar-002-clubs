import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { RentalController } from "./controller/rental.controller";
import { RentalObjectRepository } from "./repository/rental.rental-object.repository";
import { RentalService } from "./service/rental.service";

@Module({
  imports: [DrizzleModule],
  controllers: [RentalController],
  providers: [RentalService, RentalObjectRepository],
  exports: [RentalService, RentalObjectRepository],
})
export class RentalModule {}
