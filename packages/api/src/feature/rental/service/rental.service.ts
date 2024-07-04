import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { ApiRnt002RequestBody } from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt002";
import {
  ApiRnt003RequestQuery,
  ApiRnt003ResponseOK,
} from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt003";

import {
  ApiRnt006RequestQuery,
  ApiRnt006ResponseOK,
} from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt006";
import { RentalObjectRepository } from "../repository/rental.rental-object.repository";
import { RentalServiceRepository } from "../repository/rental.rental-service.repository";
import { RentalOrderRepository } from "../repository/rental.rental-order.repository";

@Injectable()
export class RentalService {
  constructor(
    private readonly rentalObjectRepository: RentalObjectRepository,
    private readonly rentalServiceRepository: RentalServiceRepository,
    private readonly rentalOrderRepository: RentalOrderRepository,
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

  async postRental(
    studentId: number,
    clubId: number,
    body: ApiRnt002RequestBody,
  ) {
    const { objects, studentPhoneNumber, purpose, desiredStart, desiredEnd } =
      body;

    const result = await this.rentalServiceRepository.createRental(
      studentId,
      clubId,
      objects,
      purpose,
      desiredStart,
      desiredEnd,
      studentPhoneNumber,
    );
    if (!result) {
      throw new HttpException("Failed to post rental", 423);
    }
  }

  async getRentals(query: ApiRnt003RequestQuery): Promise<ApiRnt003ResponseOK> {
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

  async getRental(rentalId) {
    const rental = await this.rentalOrderRepository.getRental(rentalId);
    if (rental === undefined) {
      throw new NotFoundException(`There are no matching rental`);
    }
    return rental;
  }

  async getRentalsMy(
    query: ApiRnt006RequestQuery,
  ): Promise<ApiRnt006ResponseOK> {
    // TODO: 원래는 token student Id 에서 가져와야 하는데 일단은 고정 값(1)로 할게요.
    const { pageOffset, itemCount } = query;
    const { paginatedOrders, total } =
      await this.rentalOrderRepository.getRentalsMy(pageOffset, itemCount); // , startDate, endDate);
    return {
      items: paginatedOrders,
      total,
      offset: pageOffset,
    };
  }
}
