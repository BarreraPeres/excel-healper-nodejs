import { Prisma, User } from '@prisma/client';
import { UserRepository } from './user-repository';

class InMemoryUserRepository implements UserRepository {
    public users: User[] = [];
    public idCounter = 1;

    async findManyOnly(): Promise<User[]> {
        return this.users;
    }

    async findMany(query: string, pageIndex: number) {
        const take = 10;
        return this.users
            .filter((user) => user.name.includes(query))
            .slice(pageIndex * take, (pageIndex + 1) * take);
    }
    async delete(id: number) {
        this.users = this.users.filter(user => user.id !== id)
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: this.idCounter++,
            name: data.name,
            email: data.email
        }
        this.users.push(user)
        return user;
    }

    async findUniqueByEmail(email: string) {
        return this.users.find(user => user.email === email) || null;
    }

    async findUniqueById(id: number) {
        return this.users.find(user => user.id === id) || null;
    }

    async clear(): Promise<void> {
        this.users = [];
        this.idCounter = 1;
    }
}

export const inMemoryUserRepository = new InMemoryUserRepository();