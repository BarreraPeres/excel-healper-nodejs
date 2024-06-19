import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { BadRequest } from "./_errors/bad-request";
import { userRepository } from "../../config";



export async function deleteUser(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .delete("/user/:id", {
            schema: {
                summary: "Deleta um Usuário",
                tags: ["Excel"],
                params: z.object({
                    id: z.coerce.number().int()
                })
            }
        }, async (request, reply) => {
            const { id } = request.params

            const user = await userRepository.findUniqueById(id)

            if (!user) {
                throw new BadRequest("User Not Found!")
            }

            await userRepository.delete(id)


            reply.send({ message: "User deleted successfully." })
        })
}