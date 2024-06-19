import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { BadRequest } from "./_errors/bad-request";
import { userRepository } from "../../config";

export async function getUsers(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get("/users", {
            schema: {
                summary: "Lista Os Usuários",
                tags: ["Excel"],
                response: {
                    200: z.object({
                        users: z.array(
                            z.object({
                                name: z.string(),
                                email: z.string().email(),
                                id: z.number().int()
                            })
                        )
                    })
                },
                querystring: z.object({
                    query: z.string(),
                    pageIndex: z.string().nullish().default("0").transform(Number)
                })
            }
        }, async (request, reply) => {
            const { query, pageIndex } = request.query

            const users = await userRepository.findMany(query, pageIndex)

            if (!users) {
                throw new BadRequest("Users Not Found!")
            }

            reply.send({ users })
        })
}