import { Pet, Prisma } from "@prisma/client"
import { PetsRepository } from "../pets-repository"
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []

    async findPetByCharacteristics(query: string) {
        const lowerCaseQuery = query.toLowerCase()

        return this.items.filter(item => {
            return Object.values(item).some(value => 
                value.toString().toLowerCase().includes(lowerCaseQuery)
            )
        })
    }


    async findByOrgId(id: string) {
        const filterPetsByOrgId = this.items.filter(item => item.org_id === id)

        console.log(filterPetsByOrgId)

        const petsByCityId = filterPetsByOrgId.map(item => ({
            id: item.id,
            name: item.name,
            about: item.about,
            age: item.age,
            size: item.size,
            energy_level: item.energy_level,
            independence_level: item.independence_level,
            environment: item.environment,
            photos: item.photos,
            adoption_requirements: item.adoption_requirements,
            org_id: item.org_id,
            created_at: item.created_at
        }))

        return petsByCityId
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