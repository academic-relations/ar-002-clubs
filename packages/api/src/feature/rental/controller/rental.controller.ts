import { Controller, Get, Query } from "@nestjs/common";
import {
  ApiRnt001ResponseOK,
  ApiRnt001RequestQuery,
} from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt001";
import { RentalService } from "../service/rental.service";

@Controller()
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  // TODO: Implement zod validation
  @Get("/rentals/objects/available")
  async getRentalsObjectsAvailable(
    @Query() query: ApiRnt001RequestQuery,
  ): Promise<ApiRnt001ResponseOK> {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);
    const availableObjects =
      await this.rentalService.getRentalsObjectsAvailable(startDate, endDate);

    return availableObjects;
  }
}
