import request from 'supertest'
import { app } from '@/app'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'



describe('Create organization (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('Should be able to create an organization', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        const user = await prisma.user.findFirstOrThrow()

        const response = await request(app.server)
            .post('/org')
            .set('Authorization', `Bearer ${token}`)
            .send({
                cep: '14090520',
                state: 'Sao Paulo',
                city: 'Ribeirao Preto',
                district: 'Jardim Lagoinha',
                street: 'Osorio ferreira',
                number: '467',
                phone: '16 99343 6789',
                user_id: user.id
            })

        expect(response.statusCode).toEqual(201)
    })


}) 