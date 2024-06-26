import { CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { UsernameAlreadyExistsError } from "../error/username-already-exists.error";

@Injectable()
export class UsernameAlreadyExistsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof UsernameAlreadyExistsError) {
                    throw new ConflictException(error.message);
                }
                throw error;
            })
        )
    }
    
}