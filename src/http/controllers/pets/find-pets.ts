import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindPetUseCase } from '@/use-cases/factories/make-find-pet-by-id-use-case'


export async function findPet(request: FastifyRequest, reply: FastifyReply) {
    const createFindPetParamsSchema = z.object({
        id: z.string().uuid()
    })

    const { id } = createFindPetParamsSchema.parse(request.params)


    try {
        const findPetByIdUseCase = makeFindPetUseCase()

        const pet = await findPetByIdUseCase.execute({
            id
        })

        return reply.status(200).send(pet)

    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }
}