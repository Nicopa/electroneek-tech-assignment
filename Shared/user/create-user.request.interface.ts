export interface CreateUserRequestInterface {
    readonly username: string;
    readonly email: string;
    readonly age: number;
    readonly address?: string;
}