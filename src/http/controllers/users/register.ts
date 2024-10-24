import { FastifyRequest, FastifyReply} from 'fastify'

import { z } from 'zod'
import { UserAlreadyExists } from '@/use-cases/errors/users-email-already-in-use-error'
import { makeCreateUsersUseCase } from '@/use-cases/factories/make-create-users-use-case'


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = createUserBodySchema.parse(request.body)


    try {
        const createUseCase = makeCreateUsersUseCase()

        await createUseCase.execute({
            name,
            email,
            password
        })
    } catch (err) {
        if (err instanceof UserAlreadyExists) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }

    return reply.status(201).send()   
}