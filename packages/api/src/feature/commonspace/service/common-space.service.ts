import { Injectable } from "@nestjs/common";
import { ApiCms001ResponseOK } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms001";
import { CommonSpaceRepository } from "../repository/common-space.repository";

@Injectable()
export class CommonSpaceService {
  constructor(private readonly commonSpaceRepository: CommonSpaceRepository) {}

  async getCommonSpaces(): Promise<ApiCms001ResponseOK> {
    const result = await this.commonSpaceRepository.getAllCommonSpaces();
    return { commonSpaces: result };
  }
}
