import { Pet, Prisma } from "@prisma/client"
import { PetsRepository } from "../pets-repository"
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []


    async findByOrgId(id: string) {
        const findPetsByOrgId = this.items

        
        return findPetsByOrgId
    }

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: data.id ?? randomUUID(),
            name: data.name,
            about: data.about,
            age: data.age,
            size: data.size ?? 'MEDIUM',
            energy_level: data.energy_level,
            independence_level: data.independence_level,
            environment: data.environment,
            photos: data.photos,
            adoption_requirements: data.adoption_requirements,
            org_id: data.org_id,
            created_at: new Date()
        }

        this.items.push(pet)

        return pet
    }    
}