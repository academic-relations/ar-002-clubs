import { HttpException } from "@nestjs/common";

export class BaseException extends HttpException {
  errorCode: string;

  statusCode: number;

  constructor(errorCode: string, statusCode: number) {
    super("Exception Test", statusCode);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }

  getErrorCode() {
    return this.errorCode;
  }
}
