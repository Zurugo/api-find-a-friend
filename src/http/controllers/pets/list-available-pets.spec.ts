import request from 'supertest'
import { app } from '@/app'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('List all Pets (e2e)', () => {
    beforeAll(async () => {
        await app.ready()

        const user = await prisma.user.createMany({
            data: [
                {
                    id: 'user-01',
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    password_hash: await hash('123456', 6)
                },
                {
                    id: 'user-02',
                    name: 'Hugo Salvador',
                    email: 'hugo@example.com',
                    password_hash: await hash('123456', 6)
                },
            ]
        })

        const organization = await prisma.organization.createMany({
            data: [
                {
                    id: 'org-01',
                    cep: '14090520',
                    state: 'Sao Paulo',
                    city: 'Ribeirao Preto',
                    district: 'Jardim Lagoinha',
                    street: 'Osorio ferreira',
                    number: '467',
                    phone: '16 99343 6789',
                    user_id: 'user-01'
                },
                {
                    id: 'org-02',
                    cep: '14090520',
                    state: 'Sao Paulo',
                    city: 'Franca',
                    district: 'Jardim Palma Travessos',
                    street: 'Chile',
                    number: '987',
                    phone: '16 99246 8889',
                    user_id: 'user-02'
                },

            ]
        })

        const pets = await prisma.pet.createMany({
            data:[
                {
                    id: 'pet-01',
                    name: 'Juca',
                    about: 'Ele gosta de comer muito',
                    age: '6',
                    size: 'SMALL',
                    energy_level: 10,
                    independence_level: 9,
                    environment: 'Para viver em apartamentos',
                    photos: '/var/www/myapp/storage/images/uploads/2024/10/07/image-abc12345.png',
                    adoption_requirements: 'Precisa de uma cama quente',
                    org_id: 'org-01',
                },
                {          
                    id: 'pet-02',     
                    name: 'Mel',
                    about: 'Cachorro muito carinhoso',
                    age: '2',
                    size: 'SMALL',
                    energy_level: 10,
                    independence_level: 9,
                    environment: 'Para viver em apartamentos',
                    photos: '/var/www/myapp/storage/images/uploads/2024/10/07/image-abc12345.png',
                    adoption_requirements: 'Precisa de uma cama quente',
                    org_id: 'org-01',
                },
                {          
                    id: 'pet-03',      
                    name: 'Ferggie',
                    about: 'Cachorro muito carinhoso',
                    age: '10',
                    size: 'MEDIUM',
                    energy_level: 10,
                    independence_level: 9,
                    environment: 'Para viver em apartamentos',
                    photos: '/var/www/myapp/storage/images/uploads/2024/10/07/image-abc12345.png',
                    adoption_requirements: 'Precisa de uma cama quente',
                    org_id: 'org-02',
                },
            ]
       })
    })

    afterAll(async () => {
        await app.close()
    })


    it('Should be able to search requested just filter city', async () => {
        const response = await request(app.server).get('/pets/list/Ribeirao%20Preto')

        expect(response.statusCode).toEqual(200)
        

        expect(response.body).toEqual(
            expect.objectContaining({
                pets: 
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: 'pet-01',
                            name: 'Juca',
                        }),
                        expect.objectContaining({
                            id: 'pet-02',
                            name: 'Mel',
                        }),
                    ])
                })
            )
        })
    })