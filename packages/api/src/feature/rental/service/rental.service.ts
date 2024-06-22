import { Injectable, NotFoundException } from "@nestjs/common";

import { RentalObjectRepository } from "../repository/rental.rental-object.repository";

@Injectable()
export class RentalService {
  constructor(
    private readonly rentalObjectRepository: RentalObjectRepository,
  ) {}

  async getRentalsObjectsAvailable(startDate: Date, endDate: Date) {
    const availableObjects =
      await this.rentalObjectRepository.getAvailableRentals(startDate, endDate);
    if (!availableObjects) {
      throw new NotFoundException(`There are no available objects`);
    }

    return availableObjects;
  }
}
