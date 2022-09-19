import { Request, Response } from 'express';

import { IUserSimple } from '../interfaces/userInterface';

import { userService } from '../services';


export async function signIn(req: Request, res: Response) {
    const { email, password }: IUserSimple = req.body;

    const response: string = await userService.login(email.toLocaleLowerCase(), password);

    res.status(202).send(response);
}

export async function signUp(req: Request, res: Response) {
    const { email, password }: IUserSimple = req.body;

    await userService.createNewUser(email.toLocaleLowerCase(), password);

    res.sendStatus(201);
}