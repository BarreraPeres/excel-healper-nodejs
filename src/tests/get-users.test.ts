import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../app";
import { inMemoryUserRepository } from "../repositories/in-memory-user-repository";
import request from "supertest"

describe("Get Users Route", () => {
    beforeAll(async () => {
        await app.ready()
    })

    beforeEach(async () => {
        await inMemoryUserRepository.clear()
    })

    afterAll(async () => {
        await app.close()
    })

    it("Should be list an user", async () => {
        await inMemoryUserRepository.create({
            name: "jonh",
            email: "jonhloki1@gmail.com",
        })

        await inMemoryUserRepository.create({
            name: "Jonh Doe",
            email: "jonhdoe1@gmail.com"
        })

        const response = await request(app.server)
            .get(`/api/users?query=Jonh`)


        expect(response.status).toEqual(200)
        expect(response.body.users).toHaveLength(1);
    })

    it("Should be list two users", async () => {
        await inMemoryUserRepository.create({
            name: "jonh",
            email: "jonhloki1@gmail.com",
        })

        await inMemoryUserRepository.create({
            name: "Jonh Doe",
            email: "jonhdoe1@gmail.com"
        })

        const response = await request(app.server)
            .get(`/api/users?query=`)


        expect(response.status).toEqual(200)
        expect(response.body.users).toHaveLength(2);
    })

})