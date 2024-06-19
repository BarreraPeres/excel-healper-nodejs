import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../app";
import { inMemoryUserRepository } from "../repositories/in-memory-user-repository";
import request from "supertest"

describe("Delete User Route", () => {
    beforeAll(async () => {
        await app.ready()
    });
    beforeEach(async () => {
        await inMemoryUserRepository.clear()
    })

    afterAll(async () => {
        await app.close()
    });

    it("Should delete an existing user", async () => {
        const user = await inMemoryUserRepository.create({
            name: "Diego Fernandes",
            email: 'DiegoFernandes@rocketseat.com',
        })

        const response = await request(app.server)
            .delete(`/api/user/${user.id}`)

        expect(response.status).toEqual(200)
        expect(response.body.message).toBe('User deleted successfully.')


        const deleteUser = await inMemoryUserRepository.findUniqueById(user.id)

        expect(deleteUser).toBeNull()

    })

    it("should retorn an error if user does not exists", async () => {
        const nonExistingUserId = 999

        const response = await request(app.server)
            .delete(`/api/user/${nonExistingUserId}`)

        expect(response.status).toEqual(400)
        expect(response.body.message).toBe("User Not Found!")
    })

})