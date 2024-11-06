import request from 'supertest'
import { app } from '@/app'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('List all Pets (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('Should be able to search requested just filter city', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        const user = await prisma.user.findFirstOrThrow()

        await prisma.organization.create({
            data: {
                id:'org-01',
                cep: '14090520',
                state: 'Sao Paulo',
                city: 'Ribeirao Preto',
                district: 'Castelo Branco Novo',
                street:'Jose aissum', 
                number: '1021',
                phone: '15 98822 1212',
                user_id: user.id
            }
        })


        await prisma.organization.create({
            data: {
                id:'org-02',
                cep: '14090520',
                state: 'Sao Paulo',
                city: 'Franca',
                district: 'Castelo Novo',
                street:'Aissum', 
                number: '021',
                phone: '15 98824 1212',
                user_id: user.id
            }
        })

        await prisma.pet.create({
            data: {
                id: 'Pet-01',
                name: 'Chica',
                about: 'Viralata muito animada',
                age: '12',
                size: 'SMALL',
                energy_level: 8,
                independence_level: 2,
                environment: 'Casas ou apartamentos',
                photos: 'myapp/root/app/images/org_id',
                adoption_requirements: 'Renda minima R$3500',
                org_id: 'org-01',
            }
        }) 
        
        await prisma.pet.create({
            data: {
                id: 'Pet-02',
                name: 'Juca',
                about: 'Pele sensivel',
                age: '3',
                size: 'SMALL',
                energy_level: 5,
                independence_level: 6,
                environment: 'Casas ou apartamentos',
                photos: 'myapp/root/app/images/org_id',
                adoption_requirements: 'Renda minima R$12000',
                org_id: 'org-01',
            }
        })

        await prisma.pet.create({
            data: {
                id: 'Pet-03',
                name: 'Gaia',
                about: 'Pele sensivel',
                age: '3',
                size: 'LARGE',
                energy_level: 5,
                independence_level: 6,
                environment: 'Casas ou apartamentos',
                photos: 'myapp/root/app/images/org_id',
                adoption_requirements: 'Renda minima R$12000',
                org_id: 'org-01'
            }
        })
        
        await prisma.pet.create({
            data: {
                id: 'Pet-04',
                name: 'Prin',
                about: 'Pele sensivel',
                age: '3',
                size: 'SMALL',
                energy_level: 5,
                independence_level: 6,
                environment: 'Casas ou apartamentos',
                photos: 'myapp/root/app/images/org_id',
                adoption_requirements: 'Renda minima R$12000',
                org_id: 'org-02',
            }
        })

        const response = await request(app.server)
            .get('/pets/list/Ribeirao%20Preto?query=SMALL')
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toEqual(200)
        

        expect(response.body).toEqual(
            expect.objectContaining({
                pets: 
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: 'Pet-01',
                            name: 'Chica',
                            about: 'Viralata muito animada',
                            age: '12',
                            size: 'SMALL',
                            energy_level: 8,
                            independence_level: 2,
                            environment: 'Casas ou apartamentos',
                            photos: 'myapp/root/app/images/org_id',
                            adoption_requirements: 'Renda minima R$3500',
                            org_id: 'org-01',
                        }),
                        expect.objectContaining({
                            id: 'Pet-02',
                            name: 'Juca',
                            about: 'Pele sensivel',
                            age: '3',
                            size: 'SMALL',
                            energy_level: 5,
                            independence_level: 6,
                            environment: 'Casas ou apartamentos',
                            photos: 'myapp/root/app/images/org_id',
                            adoption_requirements: 'Renda minima R$12000',
                            org_id: 'org-01',
                        }),
                    ])
                })
            )
        })
    }   
)