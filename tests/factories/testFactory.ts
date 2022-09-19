import { faker } from '@faker-js/faker';
import { ITestSimple } from '../../src/interfaces/testInterface';

export async function __createTest(): Promise<ITestSimple> {
    const newTest = {
        name: faker.animal.insect(),
        pdfUrl: faker.internet.url(),
        categoryId: faker.mersenne.rand(1,3),
        teacherId: faker.mersenne.rand(1,2),
        disciplineId: faker.mersenne.rand(1,6)
    };

    return newTest
}

export async function __createInvalidTestLink(): Promise<ITestSimple> {
    const wrongTest = {
        name: faker.animal.insect(),
        pdfUrl: faker.name.jobType(),
        categoryId: faker.mersenne.rand(1,3),
        teacherId: faker.mersenne.rand(1,2),
        disciplineId: faker.mersenne.rand(1,6)
    };

    return wrongTest
}

export async function __createInvalidTestRelation(): Promise<ITestSimple> {
    const wrongTest = {
        name: faker.animal.insect(),
        pdfUrl: faker.internet.url(),
        categoryId: faker.mersenne.rand(1,100),
        teacherId: faker.mersenne.rand(1,100),
        disciplineId: faker.mersenne.rand(1,100)
    };

    return wrongTest
}