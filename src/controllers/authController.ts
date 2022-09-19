import { Request, Response } from 'express';
//import * as userService from '../services/user.service';

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    //const response = await userService.login(email.toLocaleLowerCase(), password);

    //res.status(202).send(response);
}

export async function signUp(req: Request, res: Response) {
    const { name, email, password } = req.body;

    //await userService.createNewUser(name, email.toLocaleLowerCase(), password);

    res.sendStatus(201);
}