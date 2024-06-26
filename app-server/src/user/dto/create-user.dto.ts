import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, Length } from "class-validator";
import { CreateUserRequestInterface } from "@shared/user";

export class CreateUserDto implements CreateUserRequestInterface {
    @IsNotEmpty()
    @Length(3, 20)
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @IsNumber()
    @IsPositive()
    readonly age: number;

    @IsOptional()
    @Length(3, 20)
    readonly address?: string;
}