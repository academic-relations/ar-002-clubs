import { Controller, Get, Query } from "@nestjs/common";

import apiPrt001 from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";

import type {
  ApiPrt001RequestQuery,
  ApiPrt001ResponseOk,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";

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
      clubId,
      startDate,
      endDate,
      pageOffset,
      itemCount,
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
}
