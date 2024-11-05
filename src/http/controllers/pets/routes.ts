import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { create } from './create'
import { findPet } from './find-pets'
import { listPets } from './list-available-pets'
import { verifyJWT } from '@/http/middleware/verify-jwt'
import { verifyUserRole } from '@/http/middleware/verify-user-role'



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
    app.addHook('onRequest', verifyJWT)
    
    app.get('/pet/:id/find', findPet)
    app.get('/pets/list/:city', opts, listPets)  

    app.post('/pets', { onRequest: [verifyUserRole('ADMIN')] }, create)
}