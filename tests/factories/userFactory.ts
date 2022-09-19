import { faker } from '@faker-js/faker';
import { IUserTest } from '../../src/interfaces/userInterface'

export async function __createUser(): Promise<IUserTest> {
    const newUser = {
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(20, {casing: 'mixed'}) + '@'
    };

    return {...newUser, confirmPassword: newUser.password}
}

export async function __createInvalidUser(): Promise<IUserTest> {
    const newUser = {
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(20, {casing: 'mixed'}) + '@',
        confirmPassword: faker.random.alpha(12)
    };

    return newUser
}