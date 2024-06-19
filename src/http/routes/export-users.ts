import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import xlsx from 'xlsx';
import { userRepository } from "../../config";
import { BadRequest } from "./_errors/bad-request";


export async function exportUsers(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .get("/export", {
            schema: {
                summary: "Baixar a planilha",
                tags: ["Baixar"],
                description: "Baixar pelo CURL: 'curl -o users.xlsx http://localhost:3333/export'"
            }
        }, async (request, reply) => {
            const users = await userRepository.findManyOnly()

            if (users == null) {
                throw new BadRequest("Users Not found!")
            }

            const workSheet = xlsx.utils.json_to_sheet(users);

            const workBook = xlsx.utils.book_new();

            xlsx.utils.book_append_sheet(workBook, workSheet, "Users")

            const buffer = xlsx.write(workBook, { type: "buffer" })

            reply.header("Content-Type", "aplicattion/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            reply.header("Content-Disposition", "attachment; filename=users.xlsx")


            reply.send(buffer);
        })
}