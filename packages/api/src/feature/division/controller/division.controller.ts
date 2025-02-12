import { Controller, Get, UsePipes } from "@nestjs/common";

import type { ApiDiv001ResponseOk } from "@sparcs-clubs/interface/api/division/apiDiv001";
import apiDiv001 from "@sparcs-clubs/interface/api/division/apiDiv001";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import { Public } from "@sparcs-clubs/api/common/util/decorators/method-decorator";

import DivisionService from "../service/division.service";

@Controller()
export default class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Public()
  @Get("/divisions")
  @UsePipes(new ZodPipe(apiDiv001))
  async getDivisions(): Promise<ApiDiv001ResponseOk> {
    const divisions = await this.divisionService.getDivisions();

    return divisions;
  }
}
