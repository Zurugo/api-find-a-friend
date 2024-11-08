import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { PetsNotFoundThisCharacteristics } from './errors/pets-not-found-this-charateristics'
import { OrganizationsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ParameterCityIsRequired } from './errors/city-is-required-to-search-pets-errors'


interface ListPetsByCharacteristicsUseCaseRequest {
    city: string
    query: string | null
}

interface ListPetsByCharacteristicsUseCaseResponse {
    pets: Pet[] 
}

export class ListAvailablePetsByCharacteristics {
    constructor(
        private organizationsRepository: OrganizationsRepository,
        private petsRepository: PetsRepository
        
    ){}


    async execute({
        city,
        query
    }: ListPetsByCharacteristicsUseCaseRequest): Promise<ListPetsByCharacteristicsUseCaseResponse>
    {
        if(!city) {
            throw new ParameterCityIsRequired()
        }

        const organizations = await this.organizationsRepository.findManyOrgsByCity(city, 1)
        
        if(!organizations) {
            throw new ResourceNotFoundError()
        }

        const pets = await Promise.all(
            organizations.map(async (org) => {

                const pets = await this.petsRepository.findManyPetsByCharacteristics(org.id, query)

                if (pets.length === 0) {
                    throw new PetsNotFoundThisCharacteristics()
                }

                if(!pets) {
                    throw new ResourceNotFoundError()
                }
                return pets
            })
        )

        return {
            pets: pets.flat()
        }
    }
}