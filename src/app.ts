import fastify from 'fastify'
import { env } from './.env'
import { ZodError } from 'zod'


import { usersRoutes } from './http/controllers/users/routes'


export const app = fastify()

app.register(usersRoutes)

app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: 'Validation error.', issues: error.format()})
    }

    if(env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        //TODO: Here we should log to an external tool like DataDog/NewRelix/Sentry
    }

    return reply.status(500).send({message: 'Internal server error'})
})