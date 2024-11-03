import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { create } from './create'
import { findPet } from './find-pets'
import { listPets } from './list-available-pets'



const opts: RouteShorthandOptions = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                query: { type: 'string' }
            },
            required: []
        }
    }
}



export async function petsRoutes(app: FastifyInstance) {
    app.post('/pets', create)
    app.get('/pet/:id/find', findPet)
    app.get('/pets/list/:city', opts, listPets)  
}