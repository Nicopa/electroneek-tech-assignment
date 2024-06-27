import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { UserResponseInterface, CreateUserRequestInterface } from '@shared/user';
import { LoggerService } from '../logger/logger.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private _users = new BehaviorSubject<UserResponseInterface[]>([]);
    private _isFetching: boolean = false;
    private url = 'http://localhost:3000'
    constructor(
        private readonly loggerService: LoggerService,
        private readonly http: HttpClient
    ) {}

    get users() {
        return this._users.asObservable();
    }

    get isFetching() {
        return this._isFetching;
    }

    fetchUsers(callback?: (users: UserResponseInterface[]) => void) {
        this.loggerService.log('Fetching users');
        if (this.isFetching) {
            this.loggerService.log('Already fetching users');
            return;
        }
        this._isFetching = true;
        this.http.get<UserResponseInterface[]>(`${this.url}/user`).subscribe((users) => {
            this._users.next(users);
            this._isFetching = false;
            this.loggerService.log(`Fetched ${this._users.value.length} users`);
            if (callback) callback(users);
        });
    }

    async createUserSync(dto: CreateUserRequestInterface) {
        this.loggerService.log(`Sending new user ${dto.username} synchronously`);
        try {
            await this.http.post(`${this.url}/user`, dto).toPromise();
            this.loggerService.log(`User ${dto.username} created`);
        } catch (error: any) {
            if (error.status === 400) {
                this.loggerService.log(`400 Error creating user ${dto.username}: ${error.error.message}`);
            } else {
                this.loggerService.log(error.message);
            }
            console.error(error);
            throw error;
        }
    }

    createUser(dto: CreateUserRequestInterface) {
        this.loggerService.log(`Sending new user ${dto.username}`);
        return this.http.post(`${this.url}/user`, dto).pipe(
            catchError((error) => {
                if (error.status === 400) {
                    this.loggerService.log(`400 Error creating user ${dto.username}: ${error.error.message}`);
                } else {
                    this.loggerService.log(error.message);
                }
                console.error(error);
                return throwError(error);
            })
        );
    }
    
    deleteUser(username: string) {
        this.loggerService.log(`Deleting user ${username}`);
        return this.http.delete(`${this.url}/user/${username}`);
    }
}
