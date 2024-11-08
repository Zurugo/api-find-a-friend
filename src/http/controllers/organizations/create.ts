import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { OrganizationAlreadyExistsWithThisInfos } from '@/use-cases/errors/organization-already-exists-with-this-infos'
import { makeCreateOrganizationsUseCase } from '@/use-cases/factories/make-create-organizations-use-case'


export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createOrganizationBodySchema = z.object({
        cep: z.string(),
        state: z.string(),
        city: z.string(),
        district: z.string(),
        street: z.string(),
        number: z.string(),
        phone: z.string(),
        user_id: z.string()
    })

    const { cep, state, city, district, street, number, phone } = createOrganizationBodySchema.parse(request.body)

    try {
        const createUseCase = makeCreateOrganizationsUseCase()

        await createUseCase.execute({
            cep,
            state,
            city,
            district,
            street,
            number,
            phone,
            user_id: request.user.sub
        })
    } catch (err) {
        if (err instanceof OrganizationAlreadyExistsWithThisInfos) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }

    return reply.status(201).send()
}
