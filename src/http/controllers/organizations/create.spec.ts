import request from 'supertest'
import { app } from '@/app'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'


describe('Register (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should ble able to create organization', async () => {
        const response = await request(app.server).post('organizations').send({
            cep: '14090522',
            state: 'Sao Paulo',
            city: 'Ribeirao Preto',
            district: 'Lagoinha',
            street: 'Niteroi',
            number: '123',
            phone: '16 99439 0987',
            user_id: 'user-01'
        })

        expect(response.statusCode).toEqual(201)
    })
})