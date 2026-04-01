
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { response } from "express";
import { Observable, tap } from "rxjs";

@Injectable()
export class HeaderInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const response = context.switchToHttp().getRequest();
        response.setHeader('X-Custom-Header', 'Valor do Header Personalizado');
        return next.handle().pipe();
    }
}