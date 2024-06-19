import { Prisma, User } from "@prisma/client";
import { prisma } from "../config/prisma";
import { UserRepository } from "./user-repository";


class PrismaUsersRepository implements UserRepository {
    async findManyOnly(): Promise<User[]> {
        const user = await prisma.user.findMany()
        return user
    }

    async delete(id: number) {
        await prisma.user.delete({
            where: { id }
        })
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return prisma.user.create({
            data,
        });
    }
    async findUniqueByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    async findUniqueById(id: number) {
        return prisma.user.findUnique({
            where: { id }
        })
    }

    async findMany(query: string, pageIndex: number) {
        return prisma.user.findMany({
            select: { name: true, email: true, id: true },

            take: 10,
            skip: pageIndex * 10,

            where: query ? {
                name: {
                    contains: query,
                    mode: "insensitive"
                }
            } : {},
        })
    }

}

export const prismaUsersRepository = new PrismaUsersRepository();