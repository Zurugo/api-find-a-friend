import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { PetNotFoundError } from './errors/pet-not-found-error'

interface FindPetUseCaseRequest {
    id: string
}

interface FindPetUseCaseResponse {
    pet: Pet
}

export class FindPetUseCase {
    constructor(
        private petsRepostiory: PetsRepository
    ){}

    async execute({
        id
    }: FindPetUseCaseRequest): Promise<FindPetUseCaseResponse>{
        const pet = await this.petsRepostiory.findPetById(id)

        if(!pet) {
            throw new PetNotFoundError()
        }

        return {
            pet
        }
    }
    
}