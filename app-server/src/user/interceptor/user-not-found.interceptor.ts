import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { UserNotFoundError } from "../error/user-not-found.error";

@Injectable()
export class UserNotFoundInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof UserNotFoundError) {
                    throw new NotFoundException(error.message);
                }
                throw error;
            })
        )
    }
    
}