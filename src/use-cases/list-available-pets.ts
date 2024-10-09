import { Pet, User } from '@prisma/client'
import { PetsRepository } from "@/repositories/pets-repository"
import { OrganizationsRepository } from "@/repositories/orgs-repository"
import { UsersRepository } from '@/repositories/users-repository'
import { OrganizationCityNotAvailable } from './errors/organization-city-is-not-available-errors'
import { PetsNotAvailableInCity } from './errors/pets-not-found-in-city-error'



interface ListAvailablePetsUseCaseRequest {
    city: string
}

interface ListAvailablePetsUseCaseResponse {
    pets: Pet[]
}

export class ListAvailablePetsUseCase {
    constructor(
        private organizationsRepository: OrganizationsRepository,
        private petsRepository: PetsRepository
    ){}

    async execute({
        city
    }: ListAvailablePetsUseCaseRequest): Promise<ListAvailablePetsUseCaseResponse> {
        const organization = await this.organizationsRepository.findByCity(city)

        if (!organization) {
            throw new OrganizationCityNotAvailable()
        }

        const pets = await this.petsRepository.findByOrgId(organization.id)

        if (!pets) {
            throw new PetsNotAvailableInCity()
        }

        return { 
            pets
        }

    }
}
