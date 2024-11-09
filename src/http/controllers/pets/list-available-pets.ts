import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { makeListAvailablePets } from '@/use-cases/factories/make-list-available-pets-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { strictEqual } from 'node:assert'


export async function listPets(request: FastifyRequest, reply: FastifyReply) {
    const listPetsParamsSchema = z.object({
        city: z.string()
    })

    const queryParamsPetsSchema = z.object({
        query: z.string().optional()
    })


    const { city } = listPetsParamsSchema.parse(request.params)
    const { query } = queryParamsPetsSchema.parse(request.query)

    try {
        const listPetsUseCase = makeListAvailablePets()

        const pets = await listPetsUseCase.execute({
            city,
            query: query ? query : null
        })
        
        return reply.status(200).send(pets)

    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(409).send({ message: err.message })
        }
        throw err
    }
}