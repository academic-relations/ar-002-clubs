import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable, NotFoundException } from "@nestjs/common";

import { FileRepository } from "../repository/file.repository";

@Injectable()
export default class FilePublicService {
  constructor(
    private s3Client: S3Client,
    private fileRepository: FileRepository,
  ) {}

  async getFileUrl(fileId: string): Promise<string> {
    const file = await this.fileRepository.findById(fileId);

    if (!file) {
      throw new NotFoundException(`File not found: ${fileId}`);
    }

    // 내가 S3에 하려는 작업을 명시한다.
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `file/${file.userId}.${file.signedAt.valueOf()}.${file.name}`,
    });

    const fileUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 600,
    });

    return fileUrl;
  }

  /**
   * fileId에 해당하는 파일의 정보를 가져옵니다.
   * @param fileId 파일의 id
   * @returns 파일의 정보
   * @throws NotFoundException 파일이 존재하지 않을 경우
   * @throws NotFoundException 파일 URL이 존재하지 않을 경우
   * */
  async getFileInfoById(
    fileId: string,
  ): Promise<{ id: string; link: string; name: string }> {
    const file = await this.fileRepository.findById(fileId);

    if (!file) {
      throw new NotFoundException(`File not found: ${fileId}`);
    }

    const fileUrl = await this.getFileUrl(fileId);

    if (!fileUrl) {
      throw new NotFoundException(`File Url not found: ${fileId}`);
    }

    return { id: fileId, link: fileUrl, name: file.name };
  }
}
