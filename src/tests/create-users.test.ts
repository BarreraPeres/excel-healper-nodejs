import { afterAll, beforeAll, beforeEach, describe, expect, it, test } from "vitest"
import { app } from "../app";
import request from 'supertest'

import { inMemoryUserRepository } from "../repositories/in-memory-user-repository";


describe('Create Users Route ', () => {
    beforeAll(async () => {
        await app.ready();
    });
    beforeEach(async () => {
        await inMemoryUserRepository.clear()
    })
    afterAll(async () => {
        await app.close();
    });

    it('Should create a new user', async () => {
        const userData = {
            name: 'arthur doyle',
            email: 'arthurdoyle@gmail.com',
        };

        const response = await request(app.server)
            .post('/api/users')
            .send(userData)


        expect(response.status).toEqual(201)
        expect(response.body.userId).toBeDefined()

    });


    it("Should return an error if email is already in use", async () => {

        await inMemoryUserRepository.create({
            name: "Martin fowler",
            email: "martinfowler@gmail.com"
        })

        const emailExisting = {
            name: "Fowler Martin",
            email: "martinfowler@gmail.com"
        }

        const response = await request(app.server)
            .post('/api/users')
            .send(emailExisting)

        expect(response.status).toEqual(400)
        expect(response.body.message).toBe("Email already in use!")

        const usersWithSameEmail = await inMemoryUserRepository.findUniqueByEmail(emailExisting.email)

        expect(usersWithSameEmail).not.toBeNull()

    })
});