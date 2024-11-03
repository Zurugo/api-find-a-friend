import { Organization, Pet, Prisma } from "@prisma/client"
import { PetsRepository } from "../pets-repository"
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []
    public orgs: Organization[] = [
        {
            id:'org-01',
            cep: '14090520',
            state: 'Sao Paulo',
            city: 'Ribeirao Preto',
            district: 'Castelo Branco Novo',
            street:'Jose aissum', 
            number: '1021',
            phone: '15 98822 1212',
            user_id: 'user-01',
            created_at: new Date()
        }
    ]

    async findPetById(id: string) {
        const pet = await this.items.find((item) => item.id === id)

        if(!pet) {
            return null
        }

        return pet
    }

    async findManyPetsByCharacteristics(org_id: string, query?: string) {
        const filteredPets = this.items.filter(pet => pet.org_id === org_id);

        

        // Se `query` não estiver presente, retornamos apenas os pets filtrados por `org_id`
        if (!query) {
            return filteredPets;
        }
    
        // Transformamos `query` para minúsculas para comparação insensível a maiúsculas/minúsculas
        const lowerCaseQuery = query.toLowerCase();
    
        // Aplicamos o filtro adicional baseado nos critérios de `query`
        return filteredPets.filter(pet => {
            return (
                pet.name.toLowerCase().includes(lowerCaseQuery) ||
                pet.about?.toLowerCase().includes(lowerCaseQuery) ||
                pet.age?.toLowerCase().includes(lowerCaseQuery) ||
                pet.size === query ||  // Presumindo que `size` pode ser uma string
                pet.energy_level === parseInt(query) ||  // Presumindo que `energy_level` é um número
                pet.independence_level === parseInt(query) || // Presumindo que `independence_level` é um número
                pet.environment?.toLowerCase().includes(lowerCaseQuery) ||
                (Array.isArray(pet.adoption_requirements) && pet.adoption_requirements.some(req => req.toLowerCase().includes(lowerCaseQuery)))
            );
            
        });

        

        

    }


    async findManyPetsByOrgId(id: string) {
        const filterPetsByOrgId = this.items.filter(item => item.org_id === id)

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