import { PetsRepository } from "@/repositories/pets-repository"
import { OrganizationsRepository } from "@/repositories/orgs-repository" 
import { Pet, Size } from '@prisma/client'
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { UsersRepository } from "@/repositories/users-repository"


interface CreatePetUseCaseRequest {
    name: string
    about: string
    age: string
    size: Size
    energy_level: number
    independence_level: number
    environment: string
    photos: string
    adoption_requirements: string
    org_id: string
}

interface CreatePetUseCaseResponse {
    pet: Pet
}


export class CreatePetUseCase {
    constructor(
        private petsRepository: PetsRepository,
        private usersRepository: UsersRepository,
        private organizationsRepository: OrganizationsRepository,
        
    ){}

    async execute({
        name,
        about,
        age,
        size,
        energy_level,
        independence_level,
        environment,
        photos,
        adoption_requirements,
        org_id,
    }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        const organization = await this.organizationsRepository.findById(org_id)
        
        if (!organization) {
            throw new ResourceNotFoundError()
        }

        const pet = await this.petsRepository.create({
            name,
            about,
            age,
            size,
            energy_level,
            independence_level,
            environment,
            photos,
            adoption_requirements,
            org_id
        })

        return { 
            pet
        }
        
    }
}