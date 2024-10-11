import { expect, describe, it, beforeEach } from 'vitest'
import { ListAvailablePetsByCityUseCase } from './list-available-pets'
import { InMemoryPetsRepository } from '@/repositories/in-memory-database.ts/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory-database.ts/in-memory-organizations-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory-database.ts/in-memory-users-repository'
import { hash } from 'bcryptjs'


let usersRepository: InMemoryUsersRepository
let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: ListAvailablePetsByCityUseCase

describe('Search all availables pets list in city', () => {
    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository()
        organizationRepository = new InMemoryOrganizationsRepository()
        petsRepository = new InMemoryPetsRepository()
        
        sut = new ListAvailablePetsByCityUseCase(organizationRepository, petsRepository)

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

        await organizationRepository.create({
            id:'org-02',
            cep: '14090520',
            state: 'Sao Paulo',
            city: 'Ribeirao Preto',
            district: 'bonfim Paulista',
            street:'Indenpendencia', 
            number: '78',
            phone: '15 99822 1212',
            user_id: 'user-01'
        })

        await organizationRepository.create({
            id:'org-03',
            cep: '14090520',
            state: 'Sao Paulo',
            city: 'Franca',
            district: 'Paulista',
            street:'Indenpendencia', 
            number: '78',
            phone: '15 99822 1212',
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

        await petsRepository.create({
            id: 'Pet-02',
            name: 'Juca',
            about: 'Pele sensivel',
            age: '3',
            size: 'SMALL',
            energy_level: 5,
            independence_level: 6,
            environment: 'Casas ou apartamentos',
            photos: 'myapp/root/app/images/org_id',
            adoption_requirements: 'Renda minima R$12000',
            org_id: 'org-01',
        })

        await petsRepository.create({
            id: 'Pet-02',
            name: 'Gaia',
            about: 'Pele sensivel',
            age: '3',
            size: 'LARGE',
            energy_level: 5,
            independence_level: 6,
            environment: 'Casas ou apartamentos',
            photos: 'myapp/root/app/images/org_id',
            adoption_requirements: 'Renda minima R$12000',
            org_id: 'org-02',
        })


        await petsRepository.create({
            id: 'Pet-01',
            name: 'Linda',
            about: 'Border collie',
            age: '12',
            size: 'SMALL',
            energy_level: 8,
            independence_level: 2,
            environment: 'Casas ou apartamentos',
            photos: 'myapp/root/app/images/org_id',
            adoption_requirements: 'Renda minima R$3500',
            org_id: 'org-03',
        })
    })

    it('should be able to get a list of pets', async () => {
        const { pets } = await sut.execute({
            city: 'Ribeirao Preto'
        })

        expect(pets).toHaveLength(3)

        

        expect(pets).toEqual([
            expect.objectContaining({ org_id: 'org-01' }),
            expect.objectContaining({ org_id: 'org-01' }),
            expect.objectContaining({ org_id: 'org-02' }),
        ])
    })
})