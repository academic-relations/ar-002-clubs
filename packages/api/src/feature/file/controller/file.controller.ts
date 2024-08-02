import { Controller, Get, Query, UsePipes } from "@nestjs/common";
import apiFil001, {
  ApiFil001RequestQuery,
  ApiFil001ResponseOk,
} from "@sparcs-clubs/interface/api/file/endpoint/apiFil001";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import FilePublicService from "../service/file.public.service";
import { FileService } from "../service/file.service";

@Controller()
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly filePublicService: FilePublicService,
  ) {}

  @Get("files/file/upload-url")
  @UsePipes(new ZodPipe(apiFil001))
  async getUploadUrl(
    @Query() query: ApiFil001RequestQuery,
  ): Promise<ApiFil001ResponseOk> {
    const userId = 1;
    return this.fileService.getUploadUrl(query, userId);
  }

  // Test 용 API. 추후 삭제 필요
  @Get("files/file/file-url")
  async getFileUrl(@Query("fileId") fileId: string) {
    const fileUrl = await this.filePublicService.getFileUrl(fileId);
    return { fileUrl };
  }
}
