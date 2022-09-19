import { Test, TeacherDiscipline } from "@prisma/client";

export interface ITest extends Omit<Test, "createdAt"> {};

export interface ITestSimple extends 
    Omit<ITest, "id" | "teacherDisciplineId">, 
    Omit<TeacherDiscipline, "id" | "createdAt"> {};