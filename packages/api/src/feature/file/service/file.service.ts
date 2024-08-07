import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";

import {
  ApiFil001RequestBody,
  ApiFil001ResponseOk,
} from "@sparcs-clubs/interface/api/file/endpoint/apiFil001";

import { FileRepository } from "../repository/file.repository";

@Injectable()
export class FileService {
  constructor(
    private s3Client: S3Client,
    private fileRepository: FileRepository,
  ) {}

  async getUploadUrl(param: {
    metadata: ApiFil001RequestBody["metadata"][number];
    userId: number;
  }): Promise<ApiFil001ResponseOk["urls"][number]> {
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
}
