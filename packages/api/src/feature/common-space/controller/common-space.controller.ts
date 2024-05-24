import { getKSTDate } from "@sparcs-clubs/api/common/util/util";
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
import apiCms005, {
  ApiCms005RequestParam,
  ApiCms005RequestBody,
  ApiCms005ResponseCreated,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms005";
import apiCms006, {
  ApiCms006RequestQuery,
  ApiCms006ResponseOk,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms006";
import apiCms007, {
  ApiCms007RequestQuery,
  ApiCms007ResponseOk,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms007";
import { CommonSpaceService } from "../service/common-space.service";

@Controller()
export class CommonSpaceController {
  constructor(private readonly commonspaceService: CommonSpaceService) {}

  @Get("common-spaces")
  async getCommonSpaces(): Promise<ApiCms001ResponseOK> {
    const result = await this.commonspaceService.getCommonSpaces();
    return result;
  }

  @Get("common-spaces/common-space/:spaceId/usage-orders")
  async getCommonSpaceUsageOrder(
    @Param() param: ApiCms002RequestParam,
    @Query() query: ApiCms002RequestQuery,
  ): Promise<ApiCms002ResponseOK> {
    const tmpparam = apiCms002.requestParam.parse({
      spaceId: Number(param.spaceId),
    });
    const tmpquery = apiCms002.requestQuery.parse({
      startDate: getKSTDate(query.startDate),
      endDate: getKSTDate(query.endDate),
    });
    const result = await this.commonspaceService.getCommonSpaceUsageOrder(
      tmpparam.spaceId,
      tmpquery.startDate,
      tmpquery.endDate,
    );
    return result;
  }

  @Post("student/common-spaces/common-space/:spaceId/usage-orders/usage-order")
  async postStudentCommonSpaceUsageOrder(
    @Param() param: ApiCms003RequestParam,
    @Body() body: ApiCms003RequestBody,
  ): Promise<ApiCms003ResponseCreated> {
    const tmpparam = apiCms003.requestParam.parse({
      spaceId: Number(param.spaceId),
    });
    const tmpbody = apiCms003.requestBody.parse({
      clubId: Number(body.clubId),
      email: body.email,
      startTerm: getKSTDate(body.startTerm),
      endTerm: getKSTDate(body.endTerm),
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

  @Delete(
    "student/common-spaces/common-space/:spaceId/usage-orders/usage-order/:orderId",
  )
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

  @Post("executive/common-spaces/common-space/:spaceId/usage-orders")
  async postExecutiveCommonSpaecUsageOrder(
    @Param() param: ApiCms005RequestParam,
    @Body() body: ApiCms005RequestBody,
  ): Promise<ApiCms005ResponseCreated> {
    const tmpparam = apiCms005.requestParam.parse({
      spaceId: Number(param.spaceId),
    });
    const tmpbody = apiCms005.requestBody.parse({
      clubId: Number(body.clubId),
      startTime: Number(body.startTime),
      endTime: Number(body.endTime),
    });
    const studentId = 1;

    // 정기신청의 경우 사전에 미리 예약된 내역이 없고, 신청 과정에서 사용 가능한 시간에 대한 확인이 필요없다고 가정함.
    const result =
      await this.commonspaceService.postExecutiveCommonSpaecUsageOrder(
        tmpparam.spaceId,
        tmpbody.clubId,
        studentId,
        tmpbody.startTime,
        tmpbody.endTime,
      );
    return result;
  }

  @Get("student/common-spaces/usage-orders")
  async getStudentCommonSpacesUsageOrder(
    @Query() query: ApiCms006RequestQuery,
  ): Promise<ApiCms006ResponseOk> {
    const tmpquery = apiCms006.requestQuery.parse({
      clubId: Number(query.clubId),
      startDate: getKSTDate(query.startDate),
      endDate: getKSTDate(query.endDate),
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

  @Get("student/common-spaces/usage-orders/my")
  async getStudentCommonSpacesUsageOrderMy(
    @Query() query: ApiCms007RequestQuery,
  ): Promise<ApiCms007ResponseOk> {
    const tmpquery = apiCms007.requestQuery.parse({
      startDate: getKSTDate(query.startDate),
      endDate: getKSTDate(query.endDate),
      pageOffset: Number(query.pageOffset),
      itemCount: Number(query.itemCount),
    });
    const studentId = 1;
    const result =
      await this.commonspaceService.getStudentCommonSpacesUsageOrderMy(
        studentId,
        tmpquery.startDate,
        tmpquery.endDate,
        tmpquery.pageOffset,
        tmpquery.itemCount,
      );
    return result;
  }
}
