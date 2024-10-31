import { prisma } from "@/lib/prisma"
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'


export async function createAndAuthenticateUser(app: FastifyInstance, isOrg = false) {
    await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
            role: isOrg ? 'ADMIN' : 'MEMBER'
        }
    })

    // await request(app.server).post('/users').send({
    //     name: 'John'
    // })
}