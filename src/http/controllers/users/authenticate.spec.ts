import request from 'supertest'
import { app } from '@/app'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { Role } from '@prisma/client'


describe('Authenticate (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate', async () => {
        await request(app.server).post('/users').send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            role: 'ADMIN'
        })

        const response = await request(app.server).post('/sessions').send({
            email:'johndoe@example.com',
            password: '123456',
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})