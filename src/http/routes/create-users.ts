import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { BadRequest } from "./_errors/bad-request"
import { userRepository } from "../../config"

export async function createUsers(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post("/users", {
            schema: {
                summary: "Cria um Usuário",
                tags: ["Excel"],
                body: z.object({
                    name: z.string().min(4),
                    email: z.string().email()
                }),
                response: {
                    201: z.object({
                        userId: z.number().int()
                    })
                }

            }
        }, async (request, reply) => {
            const { name, email } = request.body

            const emailExisting = await userRepository.findUniqueByEmail(email)

            if (emailExisting) {
                throw new BadRequest("Email already in use!")
            }

            const user = await userRepository.create({
                name,
                email
            })

            reply.status(201).send({
                userId: user.id
            })
        })
}


