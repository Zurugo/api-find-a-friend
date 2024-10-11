import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findByOrgId(id: string): Promise<Pet[] | null>
    findPetByCharacteristics(query: string): Promise<Pet[] | null>
    findPetById(id: string): Promise<Pet | null>
}