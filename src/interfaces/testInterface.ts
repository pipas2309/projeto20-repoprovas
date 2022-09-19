import { Test, TeacherDiscipline } from "@prisma/client";

export interface ITest extends Omit<Test, "createdAt"> {};

export interface ITestSimple extends 
    Omit<Test, "id" | "teacherDisciplineId">, 
    Omit<TeacherDiscipline, "id" | "createdAt"> {};