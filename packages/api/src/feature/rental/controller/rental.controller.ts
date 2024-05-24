import { Controller, Get, Query, UsePipes } from "@nestjs/common";
import apiRnt001, {
  ApiRnt001ResponseOK,
  ApiRnt001RequestQuery,
} from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt001";
// import apiRnt002, {
//   ApiRnt002RequestQuery,
//   ApiRnt002RequestBody,
//   // ApiRnt002ResponseOK,
// } from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt002";
import apiRnt003, {
  ApiRnt003RequestQuery,
  ApiRnt003ResponseOK,
} from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt003";
import { ZodPipe } from "@sparcs-clubs/api/common/pipes/zod-pipe";
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

  // @Post("/student/rentals/rental")
  // @UsePipes(new ZodPipe(apiRnt002))
  // async postRental(

  //   @Query() query: ApiRnt002RequestQuery,
  //   @Body() body: ApiRnt002RequestBody,
  // ) {
  //   const clubId = query.clubId;
  //   const studentId = 1;
  //   const result = await this.rentalService.postRental( studentId, clubId, body);
  //   console.log(result);
  //   // return result;
  // }

  @Get("/student/rentals")
  @UsePipes(new ZodPipe(apiRnt003))
  async getRentals(
    @Query() query: ApiRnt003RequestQuery,
  ): Promise<ApiRnt003ResponseOK> {
    const rentals = await this.rentalService.getRentals(query);
    return rentals;
  }
}
