import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
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
import apiCms004, {
  ApiCms004RequestParam,
  ApiCms004ResponseOK,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms004";
import apiCms006, {
  ApiCms006RequestQuery,
  ApiCms006ResponseOk,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms006";
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

  @Delete("student/common-spaces/common-space/:spaceId/usage-order/:orderId")
  async deleteStudentCommonSpaceUsageOrder(
    @Param() param: ApiCms004RequestParam,
  ): Promise<ApiCms004ResponseOK> {
    const tmpparam = apiCms004.requestParam.parse({
      spaceId: Number(param.spaceId),
      orderId: Number(param.orderId),
    });
    const studentId = 1;
    const result =
      await this.commonspaceService.deleteStudentCommonSpaceUsageOrder(
        tmpparam.spaceId,
        tmpparam.orderId,
        studentId,
      );
    return result;
  }

  @Get("student/common-spaces/usage-order")
  async getStudentCommonSpacesUsageOrder(
    @Query() query: ApiCms006RequestQuery,
  ): Promise<ApiCms006ResponseOk> {
    const tmpquery = apiCms006.requestQuery.parse({
      clubId: Number(query.clubId),
      startDate: new Date(query.startDate),
      endDate: new Date(query.endDate),
      pageOffset: Number(query.pageOffset),
      itemCount: Number(query.itemCount),
    });
    const studentId = 1;
    const result =
      await this.commonspaceService.getStudentCommonSpacesUsageOrder(
        studentId,
        tmpquery.clubId,
        tmpquery.startDate,
        tmpquery.endDate,
        tmpquery.pageOffset,
        tmpquery.itemCount,
      );
    return result;
  }
}
