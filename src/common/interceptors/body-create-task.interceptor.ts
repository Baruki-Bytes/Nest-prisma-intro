import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class BodyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const request = context.switchToHttp().getRequest();
        const { method, url, body } = request
        
        
        
        console.log(`[REQUEST] [${method}] ${url}  - Inicio da requisição...`);
        console.log(`[REQUEST BODY] ${JSON.stringify(body)}`);
        return next.handle().pipe();
    }
}