import { prisma } from '@/lib/prisma'
import { Prisma, Size } from '@prisma/client'
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
    
    async findManyPetsByCharacteristics(query: string) {
        const pets = await prisma.pet.findMany({
            where: {
                OR : [
                    { name: { contains: query, mode: 'insensitive' }},
                    { about: { contains: query, mode: 'insensitive' }},
                    { age: { contains: query, mode: 'insensitive' }},
                    { size: query as Size },
                    { energy_level: { equals: parseInt(query) }},
                    { independence_level: { equals: parseInt(query) }},
                    { environment: { contains: query, mode: 'insensitive' }},
                    { adoption_requirements: { contains: query, mode: 'insensitive' }},           
                ]
            }
        })

        return pets
    }

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data,
        })

        return pet
    }
    
}
