import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
