import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user';
import { UserResponseDto } from './dto/user.response.dto';
import { UserNotFoundError } from './error/user-not-found.error';
import { UsernameAlreadyExistsError } from './error/username-already-exists.error';

jest.mock('./user.repository');
jest.mock('./user');

describe('UserService', () => {
    let userService: UserService;
    let userRepository: jest.Mocked<UserRepository>;
    const createUserDto: CreateUserDto = {
        username: 'newuser',
        email: 'test@example.com',
        age: 25,
        address: '123 Test St',
    };
    const user = {
        id: '123',
        username: createUserDto.username,
        email: createUserDto.email,
        age: createUserDto.age,
        address: createUserDto.address,
        createdAt: new Date(),
        sentences: [],
    } as unknown as User;

    beforeEach(() => {
        userRepository = new UserRepository() as jest.Mocked<UserRepository>;
        userService = new UserService(userRepository);
    });

    describe('create', () => {
        it('should throw UsernameAlreadyExistsError if username already exists', async () => {
            const createUserDto: CreateUserDto = {
                username: 'existinguser',
                email: 'test@example.com',
                age: 25,
                address: '123 Test St',
            };

            userRepository.getByUsername.mockResolvedValueOnce({} as User);

            await expect(userService.create(createUserDto)).rejects.toThrow(UsernameAlreadyExistsError);
        });

        it('should create and save a new user', async () => {
            userRepository.getByUsername.mockResolvedValueOnce(undefined);
            User.create = jest.fn().mockReturnValue(user);

            await userService.create(createUserDto);

            expect(User.create).toHaveBeenCalledWith(createUserDto);
            expect(userRepository.save).toHaveBeenCalledWith(user);
        });
    });

    describe('getByUsername', () => {
        it('should throw UserNotFoundError if user does not exist', async () => {
            userRepository.getByUsername.mockResolvedValueOnce(undefined);

            await expect(userService.getByUsername('nonexistent')).rejects.toThrow(UserNotFoundError);
        });

        it('should return UserResponseDto if user exists', async () => {
            userRepository.getByUsername.mockResolvedValueOnce(user);
            const userResponseDto = {
                id: user.id,
                username: user.username,
                email: user.email,
                age: user.age,
                address: user.address,
                createdAt: user.createdAt,
            } as UserResponseDto;

            UserResponseDto.create = jest.fn().mockReturnValue(userResponseDto);

            const result = await userService.getByUsername(user.username);

            expect(userRepository.getByUsername).toHaveBeenCalledWith(user.username);
            expect(UserResponseDto.create).toHaveBeenCalledWith(user);
            expect(result).toBe(userResponseDto);
        });
    });

    describe('getAll', () => {
        it('should return an array of UserResponseDto', async () => {
            const users = [
                {
                    id: '123',
                    username: 'user1',
                    email: 'user1@example.com',
                    age: 25,
                    address: '123 Test St',
                    createdAt: new Date(),
                    sentences: [],
                },
                {
                    id: '456',
                    username: 'user2',
                    email: 'user2@example.com',
                    age: 30,
                    address: '456 Test St',
                    createdAt: new Date(),
                    sentences: [],
                },
            ] as unknown as User[];

            const userResponseDtos = users.map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                age: user.age,
                address: user.address,
                createdAt: user.createdAt,
            })) as UserResponseDto[];

            userRepository.getAll.mockResolvedValueOnce(users);
            UserResponseDto.create = jest.fn()
                .mockImplementation(user => userResponseDtos.find(dto => dto.username === user.username));

            const result = await userService.getAll();

            expect(userRepository.getAll).toHaveBeenCalled();
            expect(UserResponseDto.create).toHaveBeenCalledTimes(users.length);
            expect(result).toEqual(userResponseDtos);
        });
    });

    describe('delete', () => {
        it('should throw UserNotFoundError if user does not exist', async () => {
            userRepository.getByUsername.mockResolvedValueOnce(undefined);

            await expect(userService.delete('nonexistent')).rejects.toThrow(UserNotFoundError);
        });

        it('should delete the user if it exists', async () => {
            userRepository.getByUsername.mockResolvedValueOnce(user);
            userRepository.delete.mockResolvedValueOnce(undefined);

            await userService.delete(user.username);

            expect(userRepository.getByUsername).toHaveBeenCalledWith(user.username);
            expect(userRepository.delete).toHaveBeenCalledWith(user.username);
        });
    });
});
