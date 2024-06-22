import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from "@nestjs/common";
import apiCms002 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms002";
import apiCms003 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms003";
import apiCms004 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms004";
import apiCms005 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms005";
import apiCms006 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms006";
import apiCms007 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms007";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import { CommonSpaceService } from "../service/common-space.service";

import type { ApiCms001ResponseOK } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms001";
import type {
  ApiCms002RequestParam,
  ApiCms002RequestQuery,
  ApiCms002ResponseOK,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms002";
import type {
  ApiCms003RequestBody,
  ApiCms003RequestParam,
  ApiCms003ResponseCreated,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms003";
import type {
  ApiCms004RequestParam,
  ApiCms004ResponseOK,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms004";
import type {
  ApiCms005RequestBody,
  ApiCms005RequestParam,
  ApiCms005ResponseCreated,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms005";
import type {
  ApiCms006RequestQuery,
  ApiCms006ResponseOk,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms006";
import type {
  ApiCms007RequestQuery,
  ApiCms007ResponseOk,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms007";

@Controller()
export class CommonSpaceController {
  constructor(private readonly commonspaceService: CommonSpaceService) {}

  @Get("common-spaces")
  async getCommonSpaces(): Promise<ApiCms001ResponseOK> {
    const result = await this.commonspaceService.getCommonSpaces();
    return result;
  }

  @Get("common-spaces/common-space/:spaceId/orders")
  @UsePipes(new ZodPipe(apiCms002))
  async getCommonSpaceUsageOrder(
    @Param() param: ApiCms002RequestParam,
    @Query() query: ApiCms002RequestQuery,
  ): Promise<ApiCms002ResponseOK> {
    const result = await this.commonspaceService.getCommonSpaceUsageOrder(
      param.spaceId,
      query.startDate,
      query.endDate,
    );
    return result;
  }

  @Post("student/common-spaces/common-space/:spaceId/orders/order")
  @UsePipes(new ZodPipe(apiCms003))
  async postStudentCommonSpaceUsageOrder(
    @Param() param: ApiCms003RequestParam,
    @Body() body: ApiCms003RequestBody,
  ): Promise<ApiCms003ResponseCreated> {
    const studentId = 1;
    const result =
      await this.commonspaceService.postStudentCommonSpaceUsageOrder(
        param.spaceId,
        body.clubId,
        studentId,
        body.startTerm,
        body.endTerm,
      );
    return result;
  }

  @Delete("student/common-spaces/common-space/:spaceId/orders/order/:orderId")
  @UsePipes(new ZodPipe(apiCms004))
  async deleteStudentCommonSpaceUsageOrder(
    @Param() param: ApiCms004RequestParam,
  ): Promise<ApiCms004ResponseOK> {
    const studentId = 1;
    const result =
      await this.commonspaceService.deleteStudentCommonSpaceUsageOrder(
        param.spaceId,
        param.orderId,
        studentId,
      );
    return result;
  }

  @Post("executive/common-spaces/common-space/:spaceId/orders")
  @UsePipes(new ZodPipe(apiCms005))
  async postExecutiveCommonSpaecUsageOrder(
    @Param() param: ApiCms005RequestParam,
    @Body() body: ApiCms005RequestBody,
  ): Promise<ApiCms005ResponseCreated> {
    const studentId = 1;

    // 정기신청의 경우 사전에 미리 예약된 내역이 없고, 신청 과정에서 사용 가능한 시간에 대한 확인이 필요없다고 가정함.
    const result =
      await this.commonspaceService.postExecutiveCommonSpaecUsageOrder(
        param.spaceId,
        body.clubId,
        studentId,
        body.startTime,
        body.endTime,
      );
    return result;
  }

  @Get("student/common-spaces/orders")
  @UsePipes(new ZodPipe(apiCms006))
  async getStudentCommonSpacesUsageOrder(
    @Query() query: ApiCms006RequestQuery,
  ): Promise<ApiCms006ResponseOk> {
    const studentId = 1;
    const result =
      await this.commonspaceService.getStudentCommonSpacesUsageOrder(
        studentId,
        query.clubId,
        query.startDate,
        query.endDate,
        query.pageOffset,
        query.itemCount,
      );
    return result;
  }

  @Get("student/common-spaces/orders/my")
  @UsePipes(new ZodPipe(apiCms007))
  async getStudentCommonSpacesUsageOrderMy(
    @Query() query: ApiCms007RequestQuery,
  ): Promise<ApiCms007ResponseOk> {
    const studentId = 1;
    const result =
      await this.commonspaceService.getStudentCommonSpacesUsageOrderMy(
        studentId,
        query.startDate,
        query.endDate,
        query.pageOffset,
        query.itemCount,
      );
    return result;
  }
}
