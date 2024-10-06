import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateUseCase } from './create-users'
import { InMemoryUsersRepository } from '../repositories/in-memory-database.ts/in-memory-users-repository'
import { UserAlreadyExists } from './errors/users-email-already-in-use'

let usersRepository: InMemoryUsersRepository
let sut: CreateUseCase

describe('Create users use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        // @ts-ignore
        sut = new CreateUseCase(usersRepository)
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })
})