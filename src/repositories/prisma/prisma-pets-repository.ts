import { prisma } from '@/lib/prisma'
import { Pet, Prisma, Size } from '@prisma/client'
import { PetsRepository } from '../pets-repository'


export class PrismaPetsRepository implements PetsRepository {
    async findPetById(id: string) {
        const pet = await prisma.pet.findUnique({
            where: {
                id,
            }
        })

        return pet
    }
    
    async findManyPetsByOrgId(id: string, page:number) {
        const pets = await prisma.pet.findMany({
            where: {
                org_id: {
                    contains: id
                },
            },
            take: 20,
            skip: (page -1) * 20
        })

        return pets
    }
    
    async findManyPetsByCharacteristics(org_id: string, query?: string) {
        const searchTerm = query ?? ''

        const pets = await prisma.pet.findMany({
            where: {
                org_id: org_id,
                OR: [
                    { name: { contains: searchTerm} },
                    ...(query && Object.values(Size).includes(query.toUpperCase() as Size) 
                    ? [{ size: query.toUpperCase() as Size }] 
                    : [])
                ]
                
            }
        })

    return pets;

    }

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data,
        })

        return pet
    }
    
}
