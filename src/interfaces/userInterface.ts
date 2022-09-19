import { User } from "@prisma/client";

export interface IUser extends Omit<User, "createdAt"> {};

export interface IUserSimple extends Omit<IUser, "id"> {};

export interface IUserTest extends IUserSimple {
    confirmPassword?: string
}