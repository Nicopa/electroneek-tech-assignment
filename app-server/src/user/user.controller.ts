import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsernameAlreadyExistsInterceptor } from "./interceptor/username-already-exists.interceptor";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UseInterceptors(UsernameAlreadyExistsInterceptor)
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Get(':username')
    getByUsername(@Param('username') username: string) {
        return this.userService.getByUsername(username);
    }

    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @Delete(':username')
    delete(@Param('username') username: string) {
        return this.userService.delete(username);
    }
}