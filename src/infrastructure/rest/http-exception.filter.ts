import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

/**
 * Http Error Filter.
 * Gets an HttpException in code and creates an error response
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();

    if (statusCode !== HttpStatus.UNPROCESSABLE_ENTITY)
      response.status(statusCode).json({
        statusCode,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });

    const exceptionResponse: any = exception.getResponse();
    console.log(exceptionResponse);

    response.status(statusCode).json({
      statusCode,
      error: exceptionResponse.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
