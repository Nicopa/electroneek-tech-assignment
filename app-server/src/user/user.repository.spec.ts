import { UserRepository } from './user.repository';
import { User } from './user';

describe('UserRepository', () => {
    let userRepository: UserRepository;
    const user = {
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
        age: 25,
        address: '123 Test St',
        createdAt: new Date(),
        sentences: [],
    } as unknown as User;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    describe('save', () => {
        it('should save a user', async () => {
            await userRepository.save(user);

            const savedUser = await userRepository.getByUsername(user.username);
            expect(savedUser).toBe(user);
        });
    });

    describe('getByUsername', () => {
        it('should return a user by username', async () => {
            await userRepository.save(user);

            const foundUser = await userRepository.getByUsername(user.username);
            expect(foundUser).toBe(user);
        });

        it('should return undefined if user does not exist', async () => {
            const foundUser = await userRepository.getByUsername('nonexistent');
            expect(foundUser).toBeUndefined();
        });
    });

    describe('getAll', () => {
        it('should return all users', async () => {
            const user2: User = {
                id: '456',
                username: 'anotheruser',
                email: 'another@example.com',
                age: 30,
                address: '456 Test St',
                createdAt: new Date(),
                sentences: [],
            } as unknown as User;

            await userRepository.save(user);
            await userRepository.save(user2);

            const users = await userRepository.getAll();
            expect(users).toEqual([user, user2]);
        });

        it('should return an empty array if no users are saved', async () => {
            const users = await userRepository.getAll();
            expect(users).toEqual([]);
        });
    });

    describe('delete', () => {
        it('should delete a user by username', async () => {
            await userRepository.save(user);

            await userRepository.delete(user.username);
            const foundUser = await userRepository.getByUsername(user.username);
            expect(foundUser).toBeUndefined();
            const users = await userRepository.getAll();
            expect(users).toEqual([]);
        });

        it('should not throw an error if user does not exist', async () => {
            await expect(userRepository.delete('nonexistent')).resolves.not.toThrow();
        });
    });
});
