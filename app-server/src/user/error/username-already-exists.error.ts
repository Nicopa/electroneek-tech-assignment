export class UsernameAlreadyExistsError extends Error {
    constructor(username: string) {
        super(`Username already exists: ${username}`);
    }
}