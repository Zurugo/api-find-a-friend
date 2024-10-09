import { expect, describe, it, beforeEach } from 'vitest'
import { ListAvailablePetsUseCase } from './list-available-pets'
import { InMemoryPetsRepository } from '@/repositories/in-memory-database.ts/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory-database.ts/in-memory-organizations-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory-database.ts/in-memory-users-repository'
import { hash } from 'bcryptjs'


let usersRepository: InMemoryUsersRepository
let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: ListAvailablePetsUseCase

describe('Get all availables pets list in selected city', () => {
    beforeEach( async() => {
        usersRepository = new InMemoryUsersRepository()
        organizationRepository = new InMemoryOrganizationsRepository()
        petsRepository = new InMemoryPetsRepository()
        
        sut = new ListAvailablePetsUseCase(organizationRepository, petsRepository)

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
            adoption_requirements: 'Renda minima 3500',
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
            adoption_requirements: 'Renda minima 3500',
            org_id: 'org-01',
        })
    })

    it('should be able to get a list of pets', async () => {
        const { pets } = await sut.execute({
            city: 'Ribeirao Preto'
        })

        console.log(pets)

        expect(pets).toHaveLength(2)

        expect(pets).toEqual([
            expect.objectContaining({ org_id: 'org-01' }),
            expect.objectContaining({ org_id: 'org-01' })
        ])
    })
})