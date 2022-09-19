import { testRepository } from '../repositories';

import { CustomError } from '../models/customErrorModel';


export async function register (name: string, pdfUrl: string, categoryId: number, teacherId: number, disciplineId: number) {

    const allChecked = await testRepository.checkIds(categoryId, teacherId, disciplineId);
    
    if(!allChecked.check) {
        throw new CustomError(
            `${allChecked.missing.join(', ')} não encontrado`, 
            404, 
            `Imagina o rolo que vai dar na hora da correção`
            );
    }

    await testRepository.insert(name, pdfUrl, categoryId, teacherId, disciplineId);
}

export async function listTestsByDiscipline () {
    const allTests = await testRepository.findAll();

    return allTests

}