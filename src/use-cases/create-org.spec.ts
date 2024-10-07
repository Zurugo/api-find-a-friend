import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrganizationUseCase } from './create-org'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory-database.ts/in-memory-organizations-repository'
import { InMemoryUsersRepository } from '../repositories/in-memory-database.ts/in-memory-users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create organizations use case', () => {
    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository()
        organizationsRepository = new InMemoryOrganizationsRepository()
        // @ts-ignore
        sut = new CreateOrganizationUseCase(organizationsRepository, usersRepository)

        const password = await hash('123456', 6)

        await usersRepository.create({
            id: 'user-01',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: password
        })
    })

    it('should be able to create an organization', async () => {
        const { organization } = await sut.execute({
            cep: '14090520',
            address: 'Avenue 13 de maio',
            phone: '16 99343 6789',
            user_id: 'user-01'
        })

        expect(organization.id).toEqual(expect.any(String))
    })

    it('should not be able to register an organization without user', async () => {
        await expect(() => 
            sut.execute({
                cep: '14090520',
                address: 'Avenue 13 de maio',
                phone: '16 99343 6789',
                user_id: 'user-02'
            }) 
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})