// 예시코드입니다.
// eslint-disable-next-line max-classes-per-file
import { HttpException } from "@nestjs/common";

// example
export class ClubException extends HttpException {
  errorString: string;

  statusCode: number;

  constructor(errorString: string, statusCode: number) {
    super(`[Club]${errorString}`, statusCode);
    this.errorString = errorString;
    this.statusCode = statusCode;
  }
}

// example. 실제로는 club에 specific한 exception만 구현해야함.
export class ClubNotFoundException extends ClubException {
  constructor() {
    super("Club not found", 403);
  }
}
