import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from "@nestjs/common";
import apiFnd001, {
  ApiFnd001RequestBody,
  ApiFnd001ResponseCreated,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd001";
import apiFnd002, {
  ApiFnd002RequestParam,
  ApiFnd002ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd002";
import apiFnd003, {
  ApiFnd003RequestBody,
  ApiFnd003RequestParam,
  ApiFnd003ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd003";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import FundingService from "../service/funding.service";

@Controller()
export default class FundingController {
  constructor(private fundingService: FundingService) {}

  // TODO: Authentication 필요
  @Post("student/fundings/funding")
  @UsePipes(new ZodPipe(apiFnd001))
  async createStudentFunding(
    @Body() body: ApiFnd001RequestBody,
  ): Promise<ApiFnd001ResponseCreated> {
    const mockUpStudentId = 605;
    const result = await this.fundingService.postStudentFunding(
      body,
      mockUpStudentId,
    );
    return result;
  }

  // TODO: Authentication 필요
  @Get("student/fundings/funding/:id")
  @UsePipes(new ZodPipe(apiFnd002))
  async getStudentFunding(
    @Param() param: ApiFnd002RequestParam,
  ): Promise<ApiFnd002ResponseOk> {
    const mockUpStudentId = 605;
    const result = await this.fundingService.getStudentFunding(
      param,
      mockUpStudentId,
    );
    return result;
  }

  // TODO: Authentication 필요
  @Put("student/fundings/funding/:id")
  @UsePipes(new ZodPipe(apiFnd003))
  async putStudentFunding(
    @Param() param: ApiFnd003RequestParam,
    @Body() body: ApiFnd003RequestBody,
  ): Promise<ApiFnd003ResponseOk> {
    const mockUpStudentId = 605;
    const result = await this.fundingService.putStudentFunding(
      body,
      param,
      mockUpStudentId,
    );
    return result;
  }
}
