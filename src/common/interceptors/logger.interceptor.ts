import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const request = context.switchToHttp().getRequest();
        const method = request.method
        const url = request.url
        const now = new Date()
        console.log(`[REQUEST] [${method}] ${url} - ${now} - Inicio da requisição...`);
        return next.handle().pipe(
            tap(() =>{
                console.log(`[RESPONSE] ${method} ${url} - ${new Date().getTime() - now.getTime()}ms - Fim da requisição`);
            })
        );
    }
}