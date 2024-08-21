import {
  GetObjectAttributesCommand,
  ObjectAttributes,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";

import logger from "@sparcs-clubs/api/common/util/logger";

import { FileRepository } from "../repository/file.repository";

import FilePublicService from "./file.public.service";

import type {
  ApiFil001RequestBody,
  ApiFil001ResponseCreated,
} from "@sparcs-clubs/interface/api/file/apiFil001";
import type {
  ApiFil002RequestBody,
  ApiFil002ResponseOk,
} from "@sparcs-clubs/interface/api/file/apiFil002";

@Injectable()
export class FileService {
  constructor(
    private s3Client: S3Client,
    private fileRepository: FileRepository,
    private filePublicService: FilePublicService,
  ) {}

  async getUploadUrl(param: {
    metadata: ApiFil001RequestBody["metadata"][number];
    userId: number;
  }): Promise<ApiFil001ResponseCreated["urls"][number]> {
    const { name, type, size } = param.metadata;
    const extension = name.split(".").pop().toLowerCase();
    const signedAt = new Date();
    signedAt.setMilliseconds(0);

    // 내가 S3에 하려는 작업을 명시한다.
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `file/${param.userId}.${signedAt.valueOf()}.${name}`,
      ContentType: type,
    });

    const fileId = await this.fileRepository.create(
      name,
      extension,
      size,
      signedAt,
      param.userId,
    );

    // Presigned URL을 생성해서 반환한다.
    const uploadUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 600,
    });
    return { uploadUrl, fileId };
  }

  async getFilesMetadata(param: {
    body: ApiFil002RequestBody;
    userId: number;
  }): Promise<ApiFil002ResponseOk> {
    const getFileSize = async (fileId: string) => {
      // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/GetObjectAttributesCommand/
      const info = await this.fileRepository.findById(fileId);

      const input = {
        // GetObjectAttributesRequest
        Bucket: process.env.S3_BUCKET_NAME, // required
        Key: `file/${param.userId}.${info.signedAt.valueOf()}.${info.name}`, // required
        // VersionId: "STRING_VALUE",
        // MaxParts: Number("int"),
        // PartNumberMarker: "STRING_VALUE",
        // SSECustomerAlgorithm: "STRING_VALUE",
        // SSECustomerKey: "STRING_VALUE",
        // SSECustomerKeyMD5: "STRING_VALUE",
        // RequestPayer: "requester",
        // ExpectedBucketOwner: "STRING_VALUE",
        ObjectAttributes: [
          ObjectAttributes.OBJECT_SIZE,
          ObjectAttributes.STORAGE_CLASS,
        ],
      };

      try {
        const command = new GetObjectAttributesCommand(input);
        logger.debug(`check fileId ${fileId}`);
        const response = await this.s3Client.send(command);
        logger.debug(response);

        if (response.$metadata.httpStatusCode !== 200) {
          return 0;
        }
        return response.ObjectSize;
      } catch {
        logger.debug(
          `failed to get metadata of fileId ${fileId}, name is ${info.name}`,
        );
        return 0;
      }
    };
    const result = await Promise.all(
      param.body.files.map(async e => this.fileRepository.findById(e.fileId)),
    );
    getFileSize(param.body.files[0].fileId);

    return {
      metadata: await Promise.all(
        result.map(async e => ({
          name: e.name,
          size: await getFileSize(e.id),
        })),
      ),
    };
  }
}
