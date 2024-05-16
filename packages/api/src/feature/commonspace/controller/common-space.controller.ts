import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiCms001ResponseOK } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms001";
import apiCms002, {
  ApiCms002RequestParam,
  ApiCms002RequestQuery,
  ApiCms002ResponseOK,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms002";
import { CommonSpaceService } from "../service/common-space.service";

@Controller()
export class CommonSpaceController {
  constructor(private readonly commonspaceService: CommonSpaceService) {}

  @Get("common-spaces")
  async getCommonSpaces(): Promise<ApiCms001ResponseOK> {
    const result = await this.commonspaceService.getCommonSpaces();
    return result;
  }

  async getCommonSpaceUsageOrder(
    @Param("spaceId") spaceId: ApiCms002RequestParam["spaceId"],
    @Query("startDate") startDate: ApiCms002RequestQuery["startDate"],
    @Query("endDate") endDate: ApiCms002RequestQuery["endDate"],
  ): Promise<ApiCms002ResponseOK> {
    const param = apiCms002.requestParam.parse({
      spaceId: Number(spaceId),
    });
    const query = apiCms002.requestQuery.parse({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
    const result = await this.commonspaceService.getCommonSpaceUsageOrder(
      param.spaceId,
      query.startDate,
      query.endDate,
    );
    return result;
  }
}
