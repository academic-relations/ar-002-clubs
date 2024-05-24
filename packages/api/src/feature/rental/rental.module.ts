import { UserRepository } from "@sparcs-clubs/api/common/repository/user.repository";
import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { RentalController } from "./controller/rental.controller";
import { RentalService } from "./service/rental.service";
import { RentalObjectRepository } from "./repository/rental.rental-object.repository";
import { RentalServiceRepository } from "./repository/rental.rental-service.repository";

@Module({
  imports: [DrizzleModule],
  controllers: [RentalController],
  providers: [
    UserRepository,
    RentalService,
    RentalObjectRepository,
    RentalServiceRepository,
  ],
  exports: [RentalService, RentalObjectRepository, RentalServiceRepository],
})
export class RentalModule {}
