import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";

import apiPrt001 from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";
import apiPrt002 from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt002";

import type {
  ApiPrt001RequestQuery,
  ApiPrt001ResponseOk,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";

import type {
  ApiPrt002RequestParam,
  ApiPrt002RequestBody,
  ApiPrt002ResponseCreated,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt002";

import logger from "@sparcs-clubs/api/common/util/logger";
import ZodValidationPipe from "@sparcs-clubs/api/common/util/zod-validation-pipe";

import { PromotionalPrintingService } from "../service/promotional-printing.service";

@Controller()
export class PromotionalPrintingController {
  constructor(
    private readonly promotionalPrintingService: PromotionalPrintingService,
  ) {}

  @Get("/student/promotional-printings/orders")
  async getStudentPromotionalPrintingsOrders(
    @Query("clubId") clubId: ApiPrt001RequestQuery["clubId"],
    @Query("startDate")
    startDate: ApiPrt001RequestQuery["startDate"] | undefined,
    @Query("endDate") endDate: ApiPrt001RequestQuery["endDate"] | undefined,
    @Query("pageOffset") pageOffset: ApiPrt001RequestQuery["pageOffset"],
    @Query("itemCount") itemCount: ApiPrt001RequestQuery["itemCount"],
  ): Promise<ApiPrt001ResponseOk> {
    // TODO: qeury param을 validation해주는 미들웨어?가 아직 없어 수동으로 validation을 수행하고 있습니다.
    // 생기고 나면 교체해줄것
    const query: ApiPrt001RequestQuery = apiPrt001.requestQuery.parse({
      clubId: Number(clubId),
      startDate: startDate === undefined ? undefined : new Date(startDate),
      endDate: endDate === undefined ? undefined : new Date(endDate),
      pageOffset: Number(pageOffset),
      itemCount: Number(itemCount),
    });

    // console.log(
    //   `[/student/promotional-printings/orders] getting promotional priting orders with query ${query}`,
    // );

    const orders =
      await this.promotionalPrintingService.getStudentPromotionalPrintingsOrders(
        query,
      );

    return orders;
  }

  @Post("/student/promotional-printings/orders/order/:clubId")
  async postStudentPromotionalPrintingsOrder(
    // zod object 이용한 custom pipe 예제가 있길래 사용해봤어요
    // parameter가 기본적으로 전부 문자열로 들어와서, zod 객체를 전부 coerce로 바꿔야 하는데,
    // 프론트에서 사용할때 바뀌는점이 아예없어서 그냥 구현할때마다 인터페이스에 coerce 추가하는 변경은 진행해도 되지 않을까요...?
    @Param(new ZodValidationPipe(apiPrt002.requestParam))
    parameter: ApiPrt002RequestParam,
    @Body(new ZodValidationPipe(apiPrt002.requestBody))
    body: ApiPrt002RequestBody,
  ): Promise<ApiPrt002ResponseCreated> {
    logger.debug(
      `[/student/promotional-printings/orders/order/:clubId] clubId: ${parameter.clubId}`,
    );

    this.promotionalPrintingService.postStudentPromotionalPrintingsOrder({
      ...parameter,
      ...body,
    });

    return {};
  }
}
