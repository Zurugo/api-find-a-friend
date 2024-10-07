import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pets'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory-database.ts/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory-database.ts/in-memory-pets-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory-database.ts/in-memory-users-repository'
import { hash } from 'bcryptjs'




let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreatePetUseCase

describe('Create a pet', () => {
    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository
        organizationsRepository = new InMemoryOrganizationsRepository()
        petsRepository = new InMemoryPetsRepository()
        sut = new CreatePetUseCase(petsRepository, usersRepository ,organizationsRepository)

        await usersRepository.create({
            id: 'user-01',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        })



    })

    it('should be able to create a pet', async () => {

        const organization = await organizationsRepository.create({
            id: 'org-01',
            cep: '14090520',
            address: 'Avenue 13 de maio',
            phone: '16 99343 6789',
            user_id: 'user-01'
        })


        const { pet } = await sut.execute({
            name: 'Pedrinho',
            about: 'Ele gosta de comer muito',
            age: '6',
            size: 'MEDIUM',
            energy_level: 10,
            independence_level: 9,
            environment: 'Para viver em apartamentos',
            photos: '/var/www/myapp/storage/images/uploads/2024/10/07/image-abc12345.png',
            adoption_requirements: 'Precisa de uma cama quente',
            org_id: organization.id,
        })

        expect(pet.id).toEqual(expect.any(String))
    })
})