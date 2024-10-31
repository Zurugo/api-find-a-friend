import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrganizationCityNotAvailable } from './errors/organization-city-is-required-to-search-pets-errors'
import { PetsNotFoundThisCharacteristics } from './errors/pets-not-found-this-charateristics'


interface ListPetsByCharacteristicsUseCaseRequest {
    query: string
}

interface ListPetsByCharacteristicsuseCaseResponse {
    pets: Pet[]
}

export class ListAvailablePetsByCharacteristics {
    constructor(private petsRepository: PetsRepository){}


    async execute({
        query
    }: ListPetsByCharacteristicsUseCaseRequest): Promise<ListPetsByCharacteristicsuseCaseResponse>
    {
        const pets = await this.petsRepository.findManyPetsByCharacteristics(query)

        if (!pets) {
            throw new PetsNotFoundThisCharacteristics()
        }

        if (pets.length === 0) {
            throw new PetsNotFoundThisCharacteristics()
        }

        return  {
            pets    
        }
    }
}