import { Injectable } from "@nestjs/common";
import { ApiCms001ResponseOK } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms001";
import { ApiCms002ResponseOK } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms002";
import { GetCommonSpaceUsageOrderRepository } from "../repository/getCommonSpaceUsageOrder.repository";
import { CommonSpaceRepository } from "../repository/common-space.repository";

@Injectable()
export class CommonSpaceService {
  constructor(
    private readonly commonSpaceRepository: CommonSpaceRepository,
    private readonly getCommonSpaceUsageOrderRepository: GetCommonSpaceUsageOrderRepository,
  ) {}

  async getCommonSpaces(): Promise<ApiCms001ResponseOK> {
    const result = await this.commonSpaceRepository.getAllCommonSpaces();
    return { commonSpaces: result };
  }

  async getCommonSpaceUsageOrder(
    spaceId,
    startDate,
    endDate,
  ): Promise<ApiCms002ResponseOK> {
    const result =
      await this.getCommonSpaceUsageOrderRepository.findBySpaceIdAndStartTermBetweenAndEndTermBetween(
        spaceId,
        startDate,
        endDate,
      );
    return result;
  }
}
