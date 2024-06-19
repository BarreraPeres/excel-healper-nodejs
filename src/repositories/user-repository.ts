
import { Prisma, User } from "@prisma/client";

export interface UserRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findUniqueByEmail(email: string): Promise<User | null>;
    findUniqueById(id: number): Promise<User | null>
    findMany(query: string, pageIndex: number): Promise<User[]>
    delete(id: number): Promise<void>;
    findManyOnly(): Promise<User[]>;
}
