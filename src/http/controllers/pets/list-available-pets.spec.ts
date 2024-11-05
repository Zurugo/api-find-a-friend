import request from 'supertest'
import { app } from '@/app'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
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

        const response = await request(app.server)
            .get('/pets/list/Ribeirao%20Preto')
            .set('Authorization', `Bearer ${token}`)

        console.log(response)


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
    }   
)