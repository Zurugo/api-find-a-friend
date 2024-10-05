import fastify from "fastify"
import { env } from "process"
import { ZodError } from "zod"


export const app = fastify()

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