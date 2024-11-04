import request from 'supertest'
import { app } from '@/app'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'



describe('Create organization (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('Should be able to create an organization', async () => {
        await prisma.user.create({
            data: {
                id: 'user-01',
                name: 'John Doe',
                email: 'johndoe@example.com',
                password_hash: await hash('123456', 6)
            }
        })
        
        const response = await request(app.server)
            .post('/org')
            .send({
                cep: '14090520',
                state: 'Sao Paulo',
                city: 'Ribeirao Preto',
                district: 'Jardim Lagoinha',
                street: 'Osorio ferreira',
                number: '467',
                phone: '16 99343 6789',
                user_id: 'user-01'
            })

        console.log(response)

        expect(response.statusCode).toEqual(201)
    })


}) 