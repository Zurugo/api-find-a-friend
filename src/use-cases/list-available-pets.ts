import { Pet } from '@prisma/client'
import { PetsRepository } from "@/repositories/pets-repository"
import { OrganizationsRepository } from "@/repositories/orgs-repository"
import { OrganizationCityNotAvailable } from './errors/organization-city-is-not-available-errors'
import { PetsNotAvailableInCity } from './errors/pets-not-found-in-city-error'


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
        const organizations = await this.organizationsRepository.findByCity(city)

        if (!organizations) {
            throw new OrganizationCityNotAvailable()
        }

        const arrayPets = await Promise.all(
            organizations.map(async(organization) => {
                return this.petsRepository.findByOrgId(organization.id)
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