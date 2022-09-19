import { prisma } from '../../src/config/database';
import * as userFactory from '../factories/userFactory';
import app from '../../src/app';
import supertest from 'supertest';
import { IUserTest } from '../../src/interfaces/userInterface';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`;
  });

afterAll(async () => {
    await prisma.$disconnect();
});

describe('Testando POST /signup - CADASTRO ', () => {
    it("Cadastrando um usuário com sucesso deve retornar 201", async () => {
        const body = await userFactory.__createUser();

        console.log(body)

        const result = await supertest(app).post('/signup').send(body);

        expect(result.status).toBe(201);
    });

    it("Cadastrando um usuário com senhas diferentes deve retornar 422", async () => {
        const body = await userFactory.__createInvalidUser();

        const result = await supertest(app).post('/signup').send(body);

        expect(result.status).toBe(422);
    })

    it("Cadastrando um usuário sem confirmar senha deve retornar 422", async () => {
        const body = await userFactory.__createUser();

        delete body.confirmPassword

        const result = await supertest(app).post('/signup').send(body);

        expect(result.status).toBe(422);
    })

    it("Cadastrando um usuário já cadastrado deve retornar 409", async () => {
        const body = await userFactory.__createUser();

        await supertest(app).post('/signup').send(body);

        const result = await supertest(app).post('/signup').send(body);

        expect(result.status).toBe(409);
    })

    it("Cadastrando um usuário com body errado deve retornar 422", async () => {
        const body = await userFactory.__createUser();

        const newBody = {...body, name: 'Antonio Fagundes'}

        const result = await supertest(app).post('/signup').send(newBody);

        expect(result.status).toBe(422);
    });

    it("Cadastrando um usuário sem input deve retornar 422", async () => {
        const body: IUserTest = {
            email: '',
            password: '',
            confirmPassword: ''
        };

        const result = await supertest(app).post('/signup').send(body);

        expect(result.status).toBe(422);
    })
});

describe('Testando POST /signin - LOGIN ', () => {
    it("Logar com um usuário existente deve retornar 202", async () => {
        const body = await userFactory.__createUser();

        await supertest(app).post('/signup').send(body);

        delete body.confirmPassword;

        const result = await supertest(app).post('/signin').send(body);

        expect(result.status).toBe(202);
    });

    it("Logar com um usuário não existente deve retornar 404", async () => {
        const body = await userFactory.__createUser();

        delete body.confirmPassword;

        const result = await supertest(app).post('/signin').send(body);

        expect(result.status).toBe(404);
    });

    it("Tentar logar com um usuário enviando o body errado deve retornar 422", async () => {
        const body = {
            enail: 'zeca.pagodin@samba.com',
            pasumordi: 'vixi#esqueci'
        }
        const result = await supertest(app).post('/signin').send(body);

        expect(result.status).toBe(422);
    });

});