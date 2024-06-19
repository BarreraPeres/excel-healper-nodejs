import "dotenv/config"
import z from "zod"
import { inMemoryUserRepository } from "../repositories/in-memory-user-repository"
import { prismaUsersRepository } from "../repositories/prisma-user-repository"

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(["dev", "test", "production"]).default("dev")
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error("Envoriment Variables Undefined!", _env.error.format())

    throw new Error("Envoriment variables Undefined or invalid 💔")
}

export const userRepository = process.env.NODE_ENV === "test" ? inMemoryUserRepository : prismaUsersRepository;

export const env = _env.data