import { Injectable, NotFoundException } from "@nestjs/common";
// import { ApiRnt002RequestBody, ApiRnt002ResponseOK } from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt002";
import { ApiRnt003RequestQuery } from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt003";
import { ApiRnt001ResponseOK } from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt001";
import { RentalObjectRepository } from "../repository/rental.rental-object.repository";
import { RentalServiceRepository } from "../repository/rental.rental-service.repository";

@Injectable()
export class RentalService {
  constructor(
    private readonly rentalObjectRepository: RentalObjectRepository,
    private readonly rentalServiceRepository: RentalServiceRepository,
  ) {}

  async getRentalsObjectsAvailable(desiredStart: Date, desiredEnd: Date) {
    const availableObjectIds =
      await this.rentalObjectRepository.getAvailableRentals(
        desiredStart,
        desiredEnd,
      );
    if (!availableObjectIds) {
      throw new NotFoundException(`There are no available objects`);
    }
    return availableObjectIds;
  }

  // async postRental(studentId: number, clubId: number,  body: ApiRnt002RequestBody){

  //   const { objects, studentPhoneNumber, purpose, desiredStart, desiredEnd } = body;
  //   const result = await this.rentalServiceRepository.createRental(
  //     studentId,
  //     clubId,
  //     objects,
  //     purpose,
  //     desiredStart,
  //     desiredEnd,
  //     studentPhoneNumber,
  //   );
  //   console.log(result);
  //   // if (!result) {
  //   //   throw new HttpException('Failed to post rental', 400);
  //   // }
  //   // return result;
  // }

  async getRentals(query: ApiRnt003RequestQuery): Promise<ApiRnt001ResponseOK> {
    const { clubId, pageOffset, itemCount } = query;
    const rentals = await this.rentalServiceRepository.getRentals(
      clubId,
      pageOffset,
      itemCount,
    );
    if (rentals === undefined) {
      throw new NotFoundException(`There are no rentals`);
    }
    const result = {
      items: rentals,
      total: rentals.length,
      offset: query.pageOffset,
    };
    return result;
  }
}
