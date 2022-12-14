import { prisma } from "../config/database";


export async function checkIds (categoryId: number, teacherId: number, disciplineId: number) {
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
        allchecked.missing.push('Categoria');
    }

    if(!teacher) {
        allchecked.missing.push('Professor');
    }

    if(!discipline) {
        allchecked.missing.push('Disciplina');
    }

    if(allchecked.missing[0]) {
        allchecked.check = false;
    }

    return allchecked;
}

export async function insert (name: string, pdfUrl: string, categoryId: number, teacherId: number, disciplineId: number) {
    const teacherDiscipline = await prisma.teacherDiscipline.upsert({
        where: {
            teacherId_disciplineId: {
                teacherId, 
                disciplineId
            }
        },
        update: {},
        create: {
            teacherId, disciplineId
        }});

    await prisma.test.create({data: {
        name, pdfUrl, categoryId, teacherDisciplineId: teacherDiscipline.id
    }})
}

export async function findAll () {
    return await prisma.teacherDiscipline.findMany({
        select: {
            teacherId: true,
            disciplineId: true,
            tests: {
                select: {
                    name: true,
                    pdfUrl: true,
                    categoryId: true,

                }
            }
        },
        orderBy: {
            createdAt: 'asc'
        }
    })
}
