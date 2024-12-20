import { expect, describe, it, beforeEach } from 'vitest'
import { ListAvailablePetsByCharacteristics } from './list-pets'
import { InMemoryUsersRepository } from '@/repositories/in-memory-database.ts/in-memory-users-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory-database.ts/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory-database.ts/in-memory-pets-repository'
import { PetsNotFoundThisCharacteristics } from './errors/pets-not-found-this-charateristics'
import { hash } from 'bcryptjs'
import { ParameterCityIsRequired } from './errors/city-is-required-to-search-pets-errors'


let usersRepository: InMemoryUsersRepository
let organizationRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: ListAvailablePetsByCharacteristics

describe('Search all pets by your characteristics', () => {
    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository()
        organizationRepository = new InMemoryOrganizationsRepository()
        petsRepository = new InMemoryPetsRepository()

        sut = new ListAvailablePetsByCharacteristics(organizationRepository, petsRepository)

        const password = await hash('123456', 6)

        await usersRepository.create({
            id: 'user-01',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: password
        })

        const organization = await organizationRepository.create({
            id:'org-01',
            cep: '14090520',
            state: 'Sao Paulo',
            city: 'RIBEIRAO PRETO',
            district: 'Castelo Branco Novo',
            street:'Jose aissum', 
            number: '1021',
            phone: '15 98822 1212',
            user_id: 'user-01'
        })

        const anotherOrganization = await organizationRepository.create({
            id:'org-02',
            cep: '14090520',
            state: 'Sao Paulo',
            city: 'FRANCA',
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
            id: 'Pet-03',
            name: 'Gaia',
            about: 'Pele sensivel',
            age: '3',
            size: 'LARGE',
            energy_level: 5,
            independence_level: 6,
            environment: 'Casas ou apartamentos',
            photos: 'myapp/root/app/images/org_id',
            adoption_requirements: 'Renda minima R$12000',
            org_id: 'org-01',
        })

        await petsRepository.create({
            id: 'Pet-03',
            name: 'Prin',
            about: 'Pele sensivel',
            age: '3',
            size: 'SMALL',
            energy_level: 5,
            independence_level: 6,
            environment: 'Casas ou apartamentos',
            photos: 'myapp/root/app/images/org_id',
            adoption_requirements: 'Renda minima R$12000',
            org_id: 'org-02',
        })
    })


    it('should be able to search a pet list by your characteristics', async () => {
        const { pets } = await sut.execute({
            city: 'RIBEIRAO PRETO',
            query: 'SMALL'
        })
        
        console.log(pets)
        expect(pets).toHaveLength(2)

        expect(pets).toEqual([
            expect.objectContaining({ size: 'SMALL' }),
            expect.objectContaining({ size: 'SMALL' }),
        ])
    })

    it('should be able to return a zero pets with the given charcterstics', async () => {
        await expect(() =>
            sut.execute({
                city: 'Ribeirao Preto',
                query: 'Horse'
            }), 
        ).rejects.toBeInstanceOf(PetsNotFoundThisCharacteristics)
    })

    it('should be able to return message to validate a city', async () => {
        await expect(() =>
            sut.execute({
                city: '',
                query: 'Horse'
            }), 
        ).rejects.toBeInstanceOf(ParameterCityIsRequired)
    })
})