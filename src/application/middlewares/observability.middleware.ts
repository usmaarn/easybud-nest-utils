import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { trace } from '@opentelemetry/api';
import { Request, Response } from 'express';
import { catchError, Observable, tap, throwError, finalize } from 'rxjs';

@Injectable()
export class ObservabilityInterceptor implements NestInterceptor {
  private readonly tracer = trace.getTracer('ObservabilityInterceptor');
  private readonly logger = new Logger(ObservabilityInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return this.tracer.startActiveSpan('observability.http', (span) => {
      const req = context.switchToHttp().getRequest() as Request;
      const res = context.switchToHttp().getResponse() as Response;

      const start = Date.now();

      span.setAttributes({
        'request.method': req.method,
        'request.url': req.originalUrl,
        'request.body': req.body,
        'request.headers': JSON.stringify(req.headers),
        'request.query': JSON.stringify(req.query),
        'request.params': JSON.stringify(req.params),
      });

      // this.logger.log({
      //     method: req.method,
      //     url: req.originalUrl,
      //     body: req.body,
      //     headers: req.headers,
      //     query: req.query,
      //     params: req.params,
      // });

      return next.handle().pipe(
        tap((response) => {
          span.setAttributes({
            'response.status': res.statusCode,
            'response.duration': `${Date.now() - start}ms`,
            'response.data': JSON.stringify(response),
          });
          // this.logger.log({
          //   method: req.method,
          //   url: req.originalUrl,
          //   status: res.statusCode,
          //   duration: `${Date.now() - start}ms`,
          //   response,
          // });
        }),
        catchError((error) => {
          span.recordException(error);
          this.logger.error({
            method: req.method,
            url: req.originalUrl,
            status: error.status || 500,
            duration: `${Date.now() - start}ms`,
            error: error.message,
            errors: error.errors,
          });

          return throwError(() => error);
        }),
        finalize(() => {
          span.end();
        }),
      );
    });
  }
}
