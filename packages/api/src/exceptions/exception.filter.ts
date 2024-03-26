// eslint-disable-next-line max-classes-per-file
import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Request, Response } from "express";
import { BaseException } from "./exception";

@Catch(BaseException)
export class HttpExceptionFilter implements ExceptionFilter<BaseException> {
  catch(exception: BaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorCode = exception.getErrorCode();

    response.status(status).json({
      statusCode: status,
      errorCdoe: errorCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

@Catch() // 모든 예외를 처리
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.json({
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
