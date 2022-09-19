import { User } from "@prisma/client";

export interface IUser extends Omit<User, "createdAt"> {};

export interface IUserSimple extends Omit<User, "id"> {};