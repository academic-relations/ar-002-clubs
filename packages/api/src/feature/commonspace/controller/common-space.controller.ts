import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiCms001ResponseOK } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms001";
import apiCms002, {
  ApiCms002RequestParam,
  ApiCms002RequestQuery,
  ApiCms002ResponseOK,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms002";
import apiCms003, {
  ApiCms003RequestParam,
  ApiCms003RequestBody,
  ApiCms003ResponseCreated,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms003";
import { CommonSpaceService } from "../service/common-space.service";

@Controller()
export class CommonSpaceController {
  constructor(private readonly commonspaceService: CommonSpaceService) {}

  @Get("common-spaces")
  async getCommonSpaces(): Promise<ApiCms001ResponseOK> {
    const result = await this.commonspaceService.getCommonSpaces();
    return result;
  }

  @Get("common-spaces/common-space/:spaceId/usage-order")
  async getCommonSpaceUsageOrder(
    @Param() param: ApiCms002RequestParam,
    @Query() query: ApiCms002RequestQuery,
  ): Promise<ApiCms002ResponseOK> {
    const tmpparam = apiCms002.requestParam.parse({
      spaceId: Number(param.spaceId),
    });
    const tmpquery = apiCms002.requestQuery.parse({
      startDate: new Date(query.startDate),
      endDate: new Date(query.endDate),
    });
    const result = await this.commonspaceService.getCommonSpaceUsageOrder(
      tmpparam.spaceId,
      tmpquery.startDate,
      tmpquery.endDate,
    );
    return result;
  }

  @Post("student/common-spaces/common-space/:spaceId/usage-order")
  async postStudentCommonSpaceUsageOrder(
    @Param() param: ApiCms003RequestParam,
    @Body() body: ApiCms003RequestBody,
  ): Promise<ApiCms003ResponseCreated> {
    const tmpparam = apiCms003.requestParam.parse({
      spaceId: Number(param.spaceId),
    });
    const tmpbody = apiCms003.requestBody.parse({
      clubId: Number(body.clubId),
      email: Number(body.email),
      startTerm: new Date(body.startTerm),
      endTerm: new Date(body.endTerm),
    });
    const studentId = 1;

    const result =
      await this.commonspaceService.postStudentCommonSpaceUsageOrder(
        tmpparam.spaceId,
        tmpbody.clubId,
        studentId,
        tmpbody.startTerm,
        tmpbody.endTerm,
      );
    return result;
  }
}
