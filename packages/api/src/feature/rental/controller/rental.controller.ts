import { Controller, Get, Query, UsePipes } from "@nestjs/common";
import apiRnt001, {
  ApiRnt001RequestQuery,
  ApiRnt001ResponseOK,
} from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt001";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import { RentalService } from "../service/rental.service";

@Controller()
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get("/rentals/objects/available")
  @UsePipes(new ZodPipe(apiRnt001))
  async getRentalsObjectsAvailable(
    @Query() query: ApiRnt001RequestQuery,
  ): Promise<ApiRnt001ResponseOK> {
    const availableObjects =
      await this.rentalService.getRentalsObjectsAvailable(
        query.startDate,
        query.endDate,
      );
    return availableObjects;
  }
}
