// eslint-disable-next-line max-classes-per-file
import { HttpException, HttpStatus } from "@nestjs/common";

export class UnauthorizedException extends HttpException {
  constructor(errorString: string) {
    super(`[Global]${errorString}`, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenException extends HttpException {
  constructor(errorString: string) {
    super(`[Global]${errorString}`, HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends HttpException {
  constructor(errorString: string) {
    super(`[Global]${errorString}`, HttpStatus.NOT_FOUND);
  }
}
