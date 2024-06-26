import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserResponseInterface, CreateUserRequestInterface } from '@shared/user';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private _users = new BehaviorSubject<UserResponseInterface[]>([]);
    private _isFetching: boolean = false;
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
        const subscription = this.http.get<UserResponseInterface[]>(`/api/user`).subscribe((users) => {
            this._users.next(users);
            this._isFetching = false;
            this.loggerService.log(`Fetched ${this._users.value.length} users`);
            if (callback) callback(users);
        });
        return subscription;
    }

    async createUserSync(dto: CreateUserRequestInterface) {
        this.loggerService.log(`Sending new user ${dto.username} synchronously`);
        try {
            await this.http.post(`/api/user`, dto).toPromise();
            this.loggerService.log(`User ${dto.username} created`);
        } catch (error) {
            this.loggerService.log(`Error creating user ${dto.username}`);
            console.error(error);
        }
    }
    // createUserSync(dto: CreateUserRequestInterface) {
    //     this.loggerService.log(`Sending new user ${dto.username} synchronously`);
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('POST', '/api/user', false);
    //     xhr.setRequestHeader('Content-Type', 'application/json');
    //     xhr.send(JSON.stringify(dto));
    //     if (xhr.status === 200) {
    //         this.loggerService.log(`User ${dto.username} created`);
    //     } else {
    //         this.loggerService.log(`Error creating user ${dto.username}`);
    //         console.log(xhr.responseText);
    //     }
    // }

    createUser(dto: CreateUserRequestInterface) {
        this.loggerService.log(`Sending new user ${dto.username}`);
        this.http.post(`/api/user`, dto).subscribe(() => {
            this.loggerService.log(`User ${dto.username} created`);
        });
    }
    
    deleteUser(username: string, callback?: () => void) {
        this.loggerService.log(`Deleting user ${username}`);
        this.http.delete(`/api/user/${username}`).subscribe(() => {
            this.loggerService.log(`User ${username} deleted`);
            if (callback) callback();
        });
    }
}
