import { v4 as uuidv4 } from 'uuid';

interface UserConstructorParams {
    id: string;
    username: string;
    email: string;
    age: number;
    createdAt: Date;
    address?: string;
}
interface NewUserParams {
    username: string;
    email: string;
    age: number;
    address?: string;
}
const randomSentences = [
    `I'm ready to learn!`,
    `I'm hungry!`,
    `Do you need me to do something?`,
    `Ah, mate! Beware of the tasks stacking up!`,
    `I'm so excited to be here!`,
    `Is this the real life? Is this just fantasy?`,
    `I'm a bit tired, but I'm still here!`,
]
export class User {
    readonly id: string;
    readonly username: string;
    readonly email: string;
    readonly age: number;
    readonly createdAt: Date;
    readonly address?: string;
    readonly sentences: string[];
    private constructor(data: UserConstructorParams) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.age = data.age;
        this.address = data.address;
        this.createdAt = data.createdAt;
        this.sentences = [
            `Hello, my name is ${this.username}`,
            `I am ${this.age} years old. Isn't that cool?`,
            `I was created at ${this.createdAt}`,
            this.address ? `I live at ${this.address}` : `I don't have an address`,
            `My email is ${this.email}`,
            ...randomSentences,
        ];
    }
    private static validateUsername(username: string) {
        if (!username) {
            throw new Error('Username is required');
        }
    }
    private static validateEmail(email: string) {
        if (!email) {
            throw new Error('Email is required');
        }
    }
    private static validateAge(age: number) {
        if (age <= 0) {
            throw new Error('Invalid age: ' + age);
        }
    }
    talk() {
        return this.sentences[Math.floor(Math.random() * this.sentences.length)];
    }
    static create(data: NewUserParams) {
        const id = uuidv4();
        this.validateUsername(data.username);
        this.validateEmail(data.email);
        this.validateAge(data.age);
        return new User({
            id,
            username: data.username,
            email: data.email,
            age: data.age,
            address: data.address,
            createdAt: new Date(),
        });
    }
    static load(data: UserConstructorParams) {
        return new User(data);
    }
}