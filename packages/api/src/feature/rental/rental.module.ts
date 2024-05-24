import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { RentalController } from "./controller/rental.controller";
import { RentalService } from "./service/rental.service";
import { RentalObjectRepository } from "./repository/rental.rental-object.repository";

@Module({
  imports: [DrizzleModule],
  controllers: [RentalController],
  providers: [RentalService, RentalObjectRepository],
  exports: [RentalService, RentalObjectRepository],
})
export class RentalModule {}
