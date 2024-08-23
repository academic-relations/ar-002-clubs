import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UsePipes,
} from "@nestjs/common";

import apiFil001 from "@sparcs-clubs/interface/api/file/apiFil001";
import apiFil002 from "@sparcs-clubs/interface/api/file/apiFil002";
import apiFil003 from "@sparcs-clubs/interface/api/file/apiFil003";

import { Request } from "express";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import logger from "@sparcs-clubs/api/common/util/logger";

import FilePublicService from "../service/file.public.service";
import { FileService } from "../service/file.service";

import type { UserAccessTokenPayload } from "@sparcs-clubs/api/feature/auth/dto/auth.dto";
import type {
  ApiFil001RequestBody,
  ApiFil001ResponseCreated,
} from "@sparcs-clubs/interface/api/file/apiFil001";
import type {
  ApiFil002RequestBody,
  ApiFil002ResponseOk,
} from "@sparcs-clubs/interface/api/file/apiFil002";
import type {
  ApiFil003RequestBody,
  ApiFil003ResponseOk,
} from "@sparcs-clubs/interface/api/file/apiFil003";

@Controller()
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly filePublicService: FilePublicService,
  ) {}

  @Post("files/upload")
  @UsePipes(new ZodPipe(apiFil001))
  async postUploadUrl(
    @Req() req: Request & UserAccessTokenPayload,
    @Body() body: ApiFil001RequestBody,
  ): Promise<ApiFil001ResponseCreated> {
    const userId = req.user.id;
    logger.debug(`[getUploadUrl] user id is ${userId}`);

    const urls = await Promise.all(
      body.metadata.map(async e =>
        this.fileService.getUploadUrl({ metadata: e, userId }),
      ),
    );

    // return this.fileService.getUploadUrl(query, userId);
    return {
      urls,
    };
  }

  @Post("files/download-links")
  @UsePipes(new ZodPipe(apiFil003))
  async getFilesDownloadLinks(
    @Req() { user }: Request & UserAccessTokenPayload,
    @Body() body: ApiFil003RequestBody,
  ): Promise<ApiFil003ResponseOk> {
    const result = await this.fileService.getFilesDownloadLinks({
      user,
      body,
    });

    return result;
  }

  @Post("files/metadata")
  @UsePipes(new ZodPipe(apiFil002))
  async getFilesMetadata(
    @Req() req: Request & UserAccessTokenPayload,
    @Body() body: ApiFil002RequestBody,
  ): Promise<ApiFil002ResponseOk> {
    const userId = req.user.id;
    logger.debug(`[getUploadUrl] user id is ${userId}`);

    const result = await this.fileService.getFilesMetadata({ body, userId });
    return result;
  }

  // Test 용 API. 추후 삭제 필요
  @Get("files/file/file-url")
  async getFileUrl(@Query("fileId") fileId: string) {
    const fileUrl = await this.filePublicService.getFileUrl(fileId);
    return { fileUrl };
  }
}
