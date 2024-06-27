import { User } from "../user";
import { UserResponseInterface } from "@shared/user";

export class UserResponseDto implements UserResponseInterface {
    /**
     * Username (must be unique)
     * @example 'johndoe'
     */
    readonly username: string;

    /**
     * Email (must be unique)
     * @example 'email@domain.com'
     */
    readonly email: string;

    /**
     * Age
     * @example 25
     */
    readonly age: number;

    /**
     * Date of creation
     * @example '2021-01-01T00:00:00.000Z'
     */
    readonly createdAt: Date;

    /**
     * Address
     * @example '1234 Elm St.'
     */
    readonly address?: string;
    private constructor(
        username: string,
        email: string,
        age: number,
        createdAt: Date,
        address?: string,
    ) {
        this.username = username;
        this.email = email;
        this.age = age;
        this.createdAt = createdAt;
        this.address = address;
    }
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