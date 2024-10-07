import { expect, describe, it, beforeEach } from 'vitest'
import { CreateUserUseCase } from './create-users'
import { InMemoryUsersRepository } from '../repositories/in-memory-database.ts/in-memory-users-repository'
import { UserAlreadyExists } from './errors/users-email-already-in-use'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create users use case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        // @ts-ignore
        sut = new CreateUserUseCase(usersRepository)
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to register with same email twice', async () => {
            const email = 'johndoe@example.com'


            await sut.execute({
                name: 'John Doe',
                email,
                password: '123456'
            })

            await expect(() => sut.execute({
                name: 'John Doe',
                email,
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExists)
    })

})
