export interface UserResponseInterface {
    readonly username: string,
    readonly email: string,
    readonly age: number,
    readonly address?: string,
    readonly createdAt: Date,
}