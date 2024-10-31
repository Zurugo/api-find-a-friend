import { Pet } from '@prisma/client'
import { PetsRepository } from "@/repositories/pets-repository"
import { OrganizationsRepository } from "@/repositories/orgs-repository"
import { OrganizationParameterCityIsRequired } from './errors/organization-city-is-required-to-search-pets-errors'
import { PetsNotAvailableInCity } from './errors/pets-not-found-in-city-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'


interface ListAvailablePetsUseCaseRequest {
    city: string
}

interface ListAvailablePetsUseCaseResponse {
    pets: Pet[]
}

export class ListAvailablePetsByCityUseCase {
    constructor(
        private organizationsRepository: OrganizationsRepository,
        private petsRepository: PetsRepository
    ){}

    async execute({
        city
    }: ListAvailablePetsUseCaseRequest): Promise<ListAvailablePetsUseCaseResponse> {
        const organizations = await this.organizationsRepository.findManyOrgsByCity(city, 1)
        if(!city) {
            throw new OrganizationParameterCityIsRequired()
        }

        if (!organizations) {
            throw new ResourceNotFoundError()
        }

        const arrayPets = await Promise.all(
            organizations.map(async(organization) => {
                return this.petsRepository.findManyPetsByOrgId(organization.id, 1)
            })
        )
        
        if (arrayPets.length === 0) {
            throw new PetsNotAvailableInCity()
        }

        const pets = arrayPets
            .filter(petByOrg => petByOrg !== null)
            .flat()
    
        return { 
            pets
        }
    }
}