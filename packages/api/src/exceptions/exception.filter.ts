// eslint-disable-next-line max-classes-per-file
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from "@nestjs/common";

@Catch() // BaseException을 상속한 exception에 대해서 실행됨.
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const resstatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log(
      exception instanceof HttpException
        ? exception.getResponse()
        : HttpStatus.INTERNAL_SERVER_ERROR,
    );
    response.status(resstatus).json({
      message: exception.getResponse(),
      statusCode: resstatus,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
