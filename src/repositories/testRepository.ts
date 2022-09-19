import { prisma } from "../config/database";


export async function checkIds(categoryId: number, teacherId: number, disciplineId: number) {
    const allchecked: {missing: string[], check: boolean} = {
        missing: [],
        check: true
    };

    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    });

    const teacher = await prisma.teacher.findUnique({
        where: {
            id: teacherId
        }
    });

    const discipline = await prisma.discipline.findUnique({
        where: {
            id: disciplineId
        }
    });

    if(!category) {
        allchecked.missing.push('category');
    }

    if(!teacher) {
        allchecked.missing.push('teacher');
    }

    if(!discipline) {
        allchecked.missing.push('discipline');
    }

    if(!allchecked.missing[0]) {
        allchecked.check = false;
    }

    return allchecked;
}

export async function insert(name: string, pdfUrl: string, categoryId: number, teacherId: number, disciplineId: number) {
    const teacherDiscipline = await prisma.teacherDiscipline.create({data: {
        teacherId, disciplineId
        }});

    await prisma.test.create({data: {
        name, pdfUrl, categoryId, teacherDisciplineId: teacherDiscipline.id
    }})
}