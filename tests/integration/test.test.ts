import { prisma } from '../../src/config/database';
import * as userFactory from '../factories/userFactory';
import * as testFactory from '../factories/testFactory';
import app from '../../src/app';
import supertest from 'supertest';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "tests"`;
  });

afterAll(async () => {
    await prisma.$disconnect();
});

let header: any = null;

describe('Testando POST /test - CADASTRO DE NOVO TESTE ', () => {

    it("Cadastrando um teste válido deve retornar 201", async () => {
        const body = await userFactory.__createUser();
        
        //criando usuário
        await supertest(app).post('/signup').send(body);

        delete body.confirmPassword;
        
        //logando para pegar o token
        const login = await supertest(app).post('/signin').send(body);

        header = 'Bearer ' + login.text

        const test = await testFactory.__createTest();

        const result = await supertest(app).post('/test').set("Authorization", header).send(test);

        expect(result.status).toBe(201);
    });

    it("Cadastrando um teste inválido deve retornar 422", async () => {
        const body = await userFactory.__createUser();
        
        //criando usuário
        await supertest(app).post('/signup').send(body);

        delete body.confirmPassword;
        
        //logando para pegar o token
        const login = await supertest(app).post('/signin').send(body);

        header = 'Bearer ' + login.text

        const test = await testFactory.__createInvalidTestLink();

        const result = await supertest(app).post('/test').set("Authorization", header).send(test);

        expect(result.status).toBe(422);
    });

    it("Cadastrando um teste com relações erradas deve retornar 404", async () => {
        const body = await userFactory.__createUser();
        
        //criando usuário
        await supertest(app).post('/signup').send(body);

        delete body.confirmPassword;
        
        //logando para pegar o token
        const login = await supertest(app).post('/signin').send(body);

        header = 'Bearer ' + login.text

        const test = await testFactory.__createInvalidTestRelation();

        const result = await supertest(app).post('/test').set("Authorization", header).send(test);

        expect(result.status).toBe(404);
    });

    it("Cadastrando um teste com autorização inválida deve retornar 401", async () => {
        const body = await userFactory.__createUser();
        
        //criando usuário
        await supertest(app).post('/signup').send(body);

        delete body.confirmPassword;
        
        //logando para pegar o token
        const login = await supertest(app).post('/signin').send(body);

        header = 'Bearer ' + 'adoleta';

        const test = await testFactory.__createInvalidTestLink();

        const result = await supertest(app).post('/test').set("Authorization", header).send(test);

        expect(result.status).toBe(401);
    });

    it("Cadastrando um teste com autorização sem BEARER deve retornar 405", async () => {
        const body = await userFactory.__createUser();
        
        //criando usuário
        await supertest(app).post('/signup').send(body);

        delete body.confirmPassword;
        
        //logando para pegar o token
        const login = await supertest(app).post('/signin').send(body);

        header = login.text;

        const test = await testFactory.__createInvalidTestLink();

        const result = await supertest(app).post('/test').set("Authorization", header).send(test);

        expect(result.status).toBe(405);
    });
});

describe('Testando GET /test - PEGAR A LISTA DOS TESTES ', () => {

    it("Pedindo a lista para o DB deve retornar 200 e um array", async () => {
        const body = await userFactory.__createUser();
        
        //criando usuário
        await supertest(app).post('/signup').send(body);

        delete body.confirmPassword;
        
        //logando para pegar o token
        const login = await supertest(app).post('/signin').send(body);

        header = 'Bearer ' + login.text;

        console.log('\n\n\n\n\n\n' + login.text);

        const test = await testFactory.__createTest();

        const result = await supertest(app).get('/test/discipline').set("Authorization", header).send(test);

        expect(result.status).toBe(200);

        expect(result.body).toBeInstanceOf(Array);
    });
});