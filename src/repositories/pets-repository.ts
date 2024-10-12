import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findManyPetsByOrgId(id: string, page:number): Promise<Pet[] | null>
    findManyPetsByCharacteristics(query: string): Promise<Pet[] | null>
    findPetById(id: string): Promise<Pet | null>
}