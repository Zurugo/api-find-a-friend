import { expect, describe, it, beforeEach } from 'vitest'
import { FindPetUseCase } from './find-pet'
import { InMemoryUsersRepository } from '@/repositories/in-memory-database.ts/in-memory-users-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory-database.ts/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory-database.ts/in-memory-pets-repository'

import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let organizationRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: FindPetUseCase


describe('Search an pet', () => {
    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository()
        organizationRepository = new InMemoryOrganizationsRepository()
        petsRepository = new InMemoryPetsRepository()
        
        sut = new FindPetUseCase(petsRepository)

        const password = await hash('123456', 6)

        await usersRepository.create({
            id: 'user-01',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: password
        })

        await organizationRepository.create({
            id:'org-01',
            cep: '14090520',
            state: 'Sao Paulo',
            city: 'Ribeirao Preto',
            district: 'Castelo Branco Novo',
            street:'Jose aissum', 
            number: '1021',
            phone: '15 98822 1212',
            user_id: 'user-01'
        })


        await petsRepository.create({
            id: 'Pet-01',
            name: 'Chica',
            about: 'Viralata muito animada',
            age: '12',
            size: 'SMALL',
            energy_level: 8,
            independence_level: 2,
            environment: 'Casas ou apartamentos',
            photos: 'myapp/root/app/images/org_id',
            adoption_requirements: 'Renda minima R$3500',
            org_id: 'org-01',
        })
    })

    it('should be able to show a pet', async () => {
        const { pet } = await sut.execute({
            id: 'Pet-01'
        })

        expect(pet.id).toEqual(expect.any(String))
    })
})