import { Injectable } from "@nestjs/common";
import { RentalObjectRepository } from "../repository/rental.rental-object.repository";

@Injectable()
export class RentalService {
  constructor(
    private readonly rentalObjectRepository: RentalObjectRepository,
  ) {}

  async getRentalsObjectsAvailable(startDate: Date, endDate: Date) {
    const availableObjects =
      await this.rentalObjectRepository.getAvailableRentals(startDate, endDate);
    return availableObjects;
  }
}
