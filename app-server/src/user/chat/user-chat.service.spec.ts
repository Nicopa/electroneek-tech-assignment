import { UserChatService } from './user-chat.service';
import { UserRepository } from '../user.repository';
import { User } from '../user';

jest.mock('../user.repository');
jest.mock('@nestjs/common', () => ({
    Injectable: jest.fn(),
    Logger: jest.fn().mockImplementation(() => ({
        log: jest.fn(),
    })),
}));
Object.defineProperty(global, 'performance', {
  writable: true,
});


describe('UserChatService', () => {
    let userChatService: UserChatService;
    let userRepository: jest.Mocked<UserRepository>;
    const users = [
        {
            id: '123',
            username: 'user1',
            email: 'user1@example.com',
            age: 25,
            address: '123 Test St',
            createdAt: new Date(),
            sentences: [],
            talk: jest.fn().mockReturnValue('Hello'),
        } as User,
        {
            id: '456',
            username: 'user2',
            email: 'user2@example.com',
            age: 30,
            address: '456 Test St',
            createdAt: new Date(),
            sentences: [],
            talk: jest.fn().mockReturnValue('Hello'),
        } as User,
    ];

    beforeAll(() => {
        userRepository = new UserRepository() as jest.Mocked<UserRepository>;
        userRepository.getAll.mockResolvedValue(users);
    });

    beforeEach(() => {
        userChatService = new UserChatService(userRepository);
        jest.useFakeTimers();
        jest.spyOn(global, 'clearInterval');
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe('generateRandomMessage', () => {
        it('should generate a random message from a random user', () => {
            const message = userChatService.generateRandomMessage(users);
            expect(['user1', 'user2']).toContain(message.username);
            expect(message.message).toBe('Hello');
        });
    });

    describe('startChat', () => {
        it('should start the chat and call the callback with a random message', async () => {
            const callback = jest.fn();

            await userChatService.startChat(callback);

            jest.advanceTimersByTime(3000);
            expect(userRepository.getAll).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should not start the chat if it is already running', async () => {
            const callback = jest.fn();

            await userChatService.startChat(callback);
            await userChatService.startChat(callback);

            expect(userRepository.getAll).toHaveBeenCalledTimes(1);
            jest.advanceTimersByTime(3000);
            expect(callback).toHaveBeenCalledTimes(1); 
        });
    });

    describe('stopChat', () => {
        it('should stop the chat if it is running', async () => {
            const callback = jest.fn();

            await userChatService.startChat(callback);
            userChatService.stopChat();

            expect(clearInterval).toHaveBeenCalledTimes(1);
        });

        it('should not stop the chat if it is not running', () => {
            userChatService.stopChat();

            expect(clearInterval).not.toHaveBeenCalled();
        });
    });
});
