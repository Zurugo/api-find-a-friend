import request from 'supertest'
import { app } from '@/app'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'


describe('Create Pet (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a pet', async ()=> {
        const { token } = await createAndAuthenticateUser(app, true)

        const user = await prisma.user.findFirstOrThrow()

        const organization = await prisma.organization.create({
            data: {
                cep: '14090520',
                state: 'Sao Paulo',
                city: 'Ribeirao Preto',
                district: 'Jardim Lagoinha',
                street: 'Osorio ferreira',
                number: '467',
                phone: '16 99343 6789',
                user_id: user.id
            }
        })

        const response = await request(app.server)
            .post('/pets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Pedrinho',
                about: 'Ele gosta de comer muito',
                age: '6',
                size: 'MEDIUM',
                energy_level: 10,
                independence_level: 9,
                environment: 'Para viver em apartamentos',
                photos: '/var/www/myapp/storage/images/uploads/2024/10/07/image-abc12345.png',
                adoption_requirements: 'Precisa de uma cama quente',
                org_id: organization.id,
            })
            
        expect(response.statusCode).toEqual(201)
    })
})