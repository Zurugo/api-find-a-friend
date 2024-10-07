import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrganizationUseCase } from './create-org'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory-database.ts/in-memory-organizations-repository'
import { InMemoryUsersRepository } from '../repositories/in-memory-database.ts/in-memory-users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Crete organizations use case', () => {
    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository()
        organizationsRepository = new InMemoryOrganizationsRepository()
        // @ts-ignore
        sut = new CreateOrganizationUseCase(organizationsRepository, usersRepository)
    })

    it('should be able to create an organization', async () => {
        const password = await hash('123456', 6)

        const user = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: password
        })


        const { organization } = await sut.execute({
            cep: '14090520',
            address: 'Avenue 13 de maio',
            phone: '16 99343 6789',
            user_id: user.id
        })

        expect(organization.id).toEqual(expect.any(String))
    })

    it('should not be able to register an organization without user', async () => {
        await expect(() => 
            sut.execute({
                cep: '14090520',
                address: 'Avenue 13 de maio',
                phone: '16 99343 6789',
                user_id: 'user.id'
            }) 
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})