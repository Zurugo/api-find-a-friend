import { FastifyRequest, FastifyReply } from 'fastify'


import { z } from 'zod'
import { OrganizationIsRequired } from '@/use-cases/errors/organization-is-required-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pets-use-case'



export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createPetsBodySchema = z.object({
        name: z.string(),
        about: z.string(),
        age: z.string(),
        size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
        energy_level: z.number(),
        independence_level: z.number(),
        environment: z.string(),
        photos: z.string(),
        adoption_requirements: z.string(),
        org_id: z.string()
    })

    const { 
        name, about, age, size, energy_level, independence_level, environment, photos , adoption_requirements, org_id 
    } = createPetsBodySchema.parse(request.body)

    try {
        const createPetUseCase = makeCreatePetUseCase()

        await createPetUseCase.execute({
            name, 
            about,
            age,
            size,
            energy_level,
            independence_level,
            environment,
            photos,
            adoption_requirements,
            org_id
        })
    } catch (err) {
        if (err instanceof OrganizationIsRequired) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }
    return reply.status(201).send()
}