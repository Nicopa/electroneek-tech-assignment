import { User } from "../user";
import { UserResponseInterface } from "@shared/user";

export class UserResponseDto implements UserResponseInterface {
    private constructor(
        readonly username: string,
        readonly email: string,
        readonly age: number,
        readonly createdAt: Date,
        readonly address?: string,
    ) {}
    static create(user: User) {
        return new UserResponseDto(
            user.username,
            user.email,
            user.age,
            user.createdAt,
            user.address,
        );
    }
}