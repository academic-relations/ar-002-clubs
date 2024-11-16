import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from "@nestjs/common";

import apiSto001, {
  ApiSto001RequestBody,
  ApiSto001ResponseCreated,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto001";
import apiSto002, {
  ApiSto002RequestQuery,
  ApiSto002ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto002";
import apiSto003, {
  ApiSto003RequestQuery,
  ApiSto003ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto003";
import apiSto004, {
  ApiSto004RequestParam,
  ApiSto004ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto004";
import apiSto005, {
  ApiSto005RequestParam,
  ApiSto005ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto005";
import apiSto006, {
  ApiSto006RequestBody,
  ApiSto006RequestParam,
  ApiSto006ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto006";
import apiSto007, {
  ApiSto007RequestBody,
  ApiSto007RequestParam,
  ApiSto007ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto007";
import apiSto008, {
  ApiSto008RequestBody,
  ApiSto008ResponseCreated,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto008";
import apiSto009, {
  ApiSto009RequestParam,
  ApiSto009ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto009";
import apiSto010, {
  ApiSto010RequestBody,
  ApiSto010RequestParam,
  ApiSto010ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto010";
import apiSto011, {
  ApiSto011RequestBody,
  ApiSto011RequestParam,
  ApiSto011ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto011";
import apiSto012, {
  ApiSto012RequestQuery,
  ApiSto012ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto012";
import apiSto013, {
  ApiSto013RequestParam,
  ApiSto013ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto013";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import {
  Executive,
  Student,
} from "@sparcs-clubs/api/common/util/decorators/method-decorator";

import { GetStudent } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import { StorageService } from "../service/storage.service";

@Controller()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Student()
  @Post("/student/storage/applications/application")
  @UsePipes(new ZodPipe(apiSto001))
  async postStudentStorageApplication(
    @Body() body: ApiSto001RequestBody,
  ): Promise<ApiSto001ResponseCreated> {
    await this.storageService.postStudentStorageApplication(body);
    return {};
  }

  @Student()
  @Get("/student/storage/applications/")
  @UsePipes(new ZodPipe(apiSto002))
  async getStudentStorageApplications(
    @Query() query: ApiSto002RequestQuery,
    @GetStudent() user: GetStudent,
  ): Promise<ApiSto002ResponseOk> {
    const applications =
      await this.storageService.getStudentStorageApplications(
        query,
        user.studentId,
      );
    return applications;
  }

  @Student()
  @Get("/student/storage/applications/my/")
  @UsePipes(new ZodPipe(apiSto003))
  async getMyStorageApplications(
    @Query() query: ApiSto003RequestQuery,
    @GetStudent() user: GetStudent,
  ): Promise<ApiSto003ResponseOk> {
    const applications = await this.storageService.getMyStorageApplications(
      query,
      user.studentId,
    );
    return applications;
  }

  @Student()
  @Get("/student/storage/applications/application/:applicationId")
  @UsePipes(new ZodPipe(apiSto004))
  async getStudentStorageApplication(
    @Param() param: ApiSto004RequestParam,
    @GetStudent() user: GetStudent,
  ): Promise<ApiSto004ResponseOk> {
    const application = await this.storageService.getStudentStorageApplication(
      param.applicationId,
      user.studentId,
    );
    return application;
  }

  @Executive()
  @Get("/executive/storage/applications/application/:applicationId")
  @UsePipes(new ZodPipe(apiSto005))
  async getExecutiveStorageApplication(
    @Param() param: ApiSto005RequestParam,
  ): Promise<ApiSto005ResponseOk> {
    const application =
      await this.storageService.getExecutiveStorageApplication(
        param.applicationId,
      );
    return application;
  }

  @Student()
  @Put("/student/storage/applications/:applicationId")
  @UsePipes(new ZodPipe(apiSto006))
  async putStudentStorageApplication(
    @Param() param: ApiSto006RequestParam,
    @Body() body: ApiSto006RequestBody,
    @GetStudent() user: GetStudent,
  ): Promise<ApiSto006ResponseOk> {
    await this.storageService.putStudentStorageApplication(
      param.applicationId,
      body,
      user.studentId,
    );
    return {};
  }

  @Executive()
  @Put("/executive/storage/applications/:applicationId")
  @UsePipes(new ZodPipe(apiSto007))
  async putExecutiveStorageApplication(
    @Param() param: ApiSto007RequestParam,
    @Body() body: ApiSto007RequestBody,
  ): Promise<ApiSto007ResponseOk> {
    await this.storageService.putExecutiveStorageApplication(
      param.applicationId,
      body,
    );
    return {};
  }

  @Executive()
  @Post("/executive/storage/contracts/contract")
  @UsePipes(new ZodPipe(apiSto008))
  async postExecutiveStorageContract(
    @Body() body: ApiSto008RequestBody,
  ): Promise<ApiSto008ResponseCreated> {
    await this.storageService.postExecutiveStorageContract(body);
    return {};
  }

  @Student()
  @Get("/student/storage/contracts/contract/:contractId")
  @UsePipes(new ZodPipe(apiSto009))
  async getStudentStorageContract(
    @Param() param: ApiSto009RequestParam,
    @GetStudent() user: GetStudent,
  ): Promise<ApiSto009ResponseOk> {
    const application = await this.storageService.getStudentStorageContract(
      param.contractId,
      user.studentId,
    );
    return application;
  }

  @Student()
  @Put("/student/storage/contracts/contract/:contractId")
  @UsePipes(new ZodPipe(apiSto010))
  async putStudentStorageContract(
    @Param() param: ApiSto010RequestParam,
    @Body() body: ApiSto010RequestBody,
    @GetStudent() user: GetStudent,
  ): Promise<ApiSto010ResponseOk> {
    await this.storageService.putStudentStorageContract(
      param.contractId,
      body,
      user.studentId,
    );
    return {};
  }

  @Executive()
  @Put("/executive/storage/applications/:applicationId")
  @UsePipes(new ZodPipe(apiSto011))
  async putExecutiveStorageContract(
    @Param() param: ApiSto011RequestParam,
    @Body() body: ApiSto011RequestBody,
  ): Promise<ApiSto011ResponseOk> {
    await this.storageService.putExecutiveStorageContract(
      param.contractId,
      body,
    );
    return {};
  }

  @Executive()
  @Get("/executive/storage/applications/")
  @UsePipes(new ZodPipe(apiSto012))
  async getExecutiveStorageApplications(
    @Query() query: ApiSto012RequestQuery,
  ): Promise<ApiSto012ResponseOk> {
    const applications =
      await this.storageService.getExecutiveStorageApplications(query);
    return applications;
  }

  @Executive()
  @Get("/executive/storage/contracts/contract/:contractId")
  @UsePipes(new ZodPipe(apiSto013))
  async getExecutiveStorageContract(
    @Param() param: ApiSto013RequestParam,
  ): Promise<ApiSto013ResponseOk> {
    const contract = await this.storageService.getExecutiveStorageContract(
      param.contractId,
    );
    return contract;
  }
}
