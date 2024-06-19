import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { app } from "../app"
import { inMemoryUserRepository } from "../repositories/in-memory-user-repository"
import request from "supertest"


describe("Export Users Route", () => {
    beforeAll(async () => {
        await app.ready()
    })

    beforeEach(async () => {
        await inMemoryUserRepository.clear()
    })
    afterAll(async () => {
        await app.close()
    })

    it("Should export users as a Excel file", async () => {
        await inMemoryUserRepository.create({
            name: "Jonny Boy",
            email: "Jonnyboy@gmail.com"
        })
        await inMemoryUserRepository.create({
            name: "Joao barro",
            email: "joaobarro@gmail.com"
        })

        const response = await request(app.server)
            .get(`/export`)

        expect(response.status).toEqual(200)
        expect(response.headers["content-type"]).toBe("aplicattion/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        expect(response.headers["content-disposition"]).toBe('attachment; filename=users.xlsx');
    })


})