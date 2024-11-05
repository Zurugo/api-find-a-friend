import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyUserRole } from '@/http/middleware/verify-user-role'
import { verifyJWT } from '@/http/middleware/verify-jwt'


export async function organizationsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/org', { onRequest: [verifyUserRole('ADMIN')] } , create)
}