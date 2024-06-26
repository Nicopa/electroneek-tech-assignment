import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user";
import { UserResponseDto } from "./dto/user.response.dto";
import { UserNotFoundError } from "./error/user-not-found.error";
import { UsernameAlreadyExistsError } from "./error/username-already-exists.error";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
    async create(dto: CreateUserDto) {
        const userAlreadyExists = await this.userRepository.getByUsername(dto.username);
        if (userAlreadyExists) {
            throw new UsernameAlreadyExistsError(dto.username);
        }
        const user = User.create(dto);
        return this.userRepository.save(user);
    }
    async getByUsername(id: string): Promise<UserResponseDto> {
        const user = await this.userRepository.getByUsername(id);
        if (!user) throw new UserNotFoundError();
        return UserResponseDto.create(user);
    }
    async getAll(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.getAll();
        return users.map(UserResponseDto.create);
    }
    async delete(username: string) {
        const user = await this.userRepository.getByUsername(username);
        if (!user) {
            throw new UserNotFoundError();
        }
        return this.userRepository.delete(username);
    }
}