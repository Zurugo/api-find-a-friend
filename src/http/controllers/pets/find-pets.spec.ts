import request from 'supertest'
import { app } from '@/app'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Find pet by Id (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to return a pet by ID', async () => {
        const user = await prisma.user.create({
            data: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password_hash: await hash('123456', 6)
            }
        })

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

        const pet = await prisma.pet.create({
            data: {
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
            }
        })

        const response = await request(app.server).get(`/pet/${pet.id}/find`)


        expect(response.statusCode).toEqual(200)
    })
})