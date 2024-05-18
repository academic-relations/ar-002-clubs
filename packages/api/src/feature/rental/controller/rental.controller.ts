import { Controller, Get, Query, UsePipes } from "@nestjs/common";
import apiRnt001, {
  ApiRnt001ResponseOK,
  ApiRnt001RequestQuery,
} from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt001";
import { ZodPipe } from "@sparcs-clubs/api/common/pipes/zod-pipe";
import { RentalService } from "../service/rental.service";

@Controller()
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  // TODO: Implement zod validation
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
