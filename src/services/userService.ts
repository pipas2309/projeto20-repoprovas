import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { CustomError } from '../models/customErrorModel';

//import * as userRepository from '../repositories/user.repository'

//import * as encryptUtil from '../utils/encryptUtil';

export async function createNewUser(email: string, password: string) {
    const registered = await itIsRegistered(email);

    if(registered) {
        throw new CustomError(
            `Usuário já cadastrado`, 
            409, 
            `Se você quer esconder informações de você mesmo, vai precisar se esforçar... (ou criar um novo email :0)!`
            );
    }

    //const hashPassword: string = await encryptUtil.hashPassword(password)

    //await userRepository.insert(name, email, hashPassword);
}

export async function login(email: string, password: string) {
    const registeredUser = await itIsRegistered(email);

    if(!registeredUser) {
        throw new CustomError(
            `Usuário não encontrado!`, 
            404, 
            `Duentes passam por aqui as vezes e levam nossos cadastros, ou você errou a senha / email...`
            );
    }

    //const valid = await encryptUtil.checkPassword(password, registeredUser.password);

    // if(valid) {
    //     return jwt.sign({userId: registeredUser.id}, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: '60m'});
    // } else {
    //     throw new CustomError(
    //         `Usuário não encontrado!`, 
    //         404, 
    //         `Duentes passam por aqui as vezes e levam nossos cadastros, ou você errou a senha / email...`
    //         );
    // }
    
}

async function itIsRegistered(email: string) {
    // const registered = await userRepository.findByEmail(email);

    // if(registered) return registered;

    return false;
}