// eslint-disable-next-line max-classes-per-file
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { ZodError } from "zod";
import { ClubException } from "./club.exception";

@Catch() // BaseException을 상속한 exception에 대해서 실행됨.
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const resStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(resStatus).json({
      statusCode: resStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

@Catch(ZodError)
export class ZodErrorFilter<T extends ZodError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const resStatus = HttpStatus.NOT_ACCEPTABLE;
    response.status(resStatus).json({
      message: exception.errors,
      statusCode: resStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

@Catch(ClubException) // BaseException을 상속한 exception에 대해서 실행됨.
export class ClubExceptionFilter<T extends ClubException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const resStatus = exception.getStatus();
    response.status(resStatus).json({
      message: exception.getResponse(), // test를 위한 코드
      statusCode: resStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
