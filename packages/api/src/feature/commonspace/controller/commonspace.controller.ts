import { Controller, Get } from "@nestjs/common";
import { ApiCms001ResponseOK } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms001";
import { CommonSpaceService } from "../service/commonspace.service";

@Controller("common-spaces")
export class CommonSpaceController {
  constructor(private readonly commonspaceService: CommonSpaceService) {}

  @Get()
  async getCommonSpaces(): Promise<ApiCms001ResponseOK> {
    const result = await this.commonspaceService.getCommonSpaces();
    return result;
  }
}
