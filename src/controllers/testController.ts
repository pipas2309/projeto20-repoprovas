import { Request, Response } from 'express';

import { ITestSimple } from '../interfaces/testInterface';

import { testService } from '../services';


export async function newTest(req: Request, res: Response) {
    const { name, pdfUrl, categoryId, teacherId, disciplineId }: ITestSimple = req.body;

    await testService.register(name, pdfUrl, categoryId, teacherId, disciplineId);

    res.status(201).send(`Teste ${name} criado com sucesso!`);
}

export async function getByDiscipline (req: Request, res: Response) {
    const response = await testService.listTestsByDiscipline();

    res.status(200).send(response);
}