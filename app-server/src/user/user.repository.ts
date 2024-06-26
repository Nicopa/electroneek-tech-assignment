import { Injectable } from "@nestjs/common";
import { User } from "./user";

/**
 * Note
 * - It's returning promises to simulate async operations.
 */
@Injectable()
export class UserRepository {
    private readonly users: Map<string, User> = new Map();
    save(user: User): Promise<void> {
        this.users.set(user.username, user);
        return Promise.resolve();
    }
    getByUsername(username: User['username']): Promise<User | undefined> {
        return Promise.resolve(this.users.get(username));
    }
    getAll(): Promise<User[]> {
        return Promise.resolve(Array.from(this.users.values()));
    }
    delete(id: string): Promise<void> {
        this.users.delete(id);
        return Promise.resolve();
    }
}