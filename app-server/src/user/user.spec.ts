import { User } from './user'; // Adjust the import path as necessary

const mockUuid = '123e4567-e89b-12d3-a456-426614174000';
jest.mock('uuid', () => ({
    v4: jest.fn(() => mockUuid),
}));

describe('User', () => {
    const newUserParams = {
        username: 'testuser',
        email: 'test@example.com',
        age: 25,
        address: '123 Test St',
    };
    describe('create', () => {
        it('should throw an error if username is missing', () => {
            expect(() => User.create({
                username: '',
                email: 'test@example.com',
                age: 25,
            })).toThrow('Username is required');
        });

        it('should throw an error if email is missing', () => {
            expect(() => User.create({
                username: 'testuser',
                email: '',
                age: 25,
            })).toThrow('Email is required');
        });

        it('should throw an error if age is invalid', () => {
            expect(() => User.create({
                username: 'testuser',
                email: 'test@example.com',
                age: -1,
            })).toThrow('Invalid age: -1');
        });

        it('should create a new user with valid data', () => {
            const user = User.create(newUserParams);

            expect(user).toBeInstanceOf(User);
            expect(user.id).toBe(mockUuid);
            expect(user.username).toBe(newUserParams.username);
            expect(user.email).toBe(newUserParams.email);
            expect(user.age).toBe(newUserParams.age);
            expect(user.address).toBe(newUserParams.address);
            expect(user.createdAt).toBeInstanceOf(Date);
        });
    });

    describe('load', () => {
        it('should load an existing user with valid data', () => {
            const existingUserParams = {
                id: mockUuid,
                username: 'testuser',
                email: 'test@example.com',
                age: 25,
                createdAt: new Date(),
                address: '123 Test St',
            };

            const user = User.load(existingUserParams);

            expect(user).toBeInstanceOf(User);
            expect(user.id).toBe(existingUserParams.id);
            expect(user.username).toBe(existingUserParams.username);
            expect(user.email).toBe(existingUserParams.email);
            expect(user.age).toBe(existingUserParams.age);
            expect(user.address).toBe(existingUserParams.address);
            expect(user.createdAt).toBe(existingUserParams.createdAt);
        });
    });

    describe('talk', () => {
        it('should return a random sentence from the user', () => {
            const user = User.create(newUserParams);

            const sentence = user.talk();
            expect(user.sentences).toContain(sentence);
        });
    });
});
