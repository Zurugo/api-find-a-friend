import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findManyPetsByOrgId(id: string, page:number): Promise<Pet[] | null>
    findManyPetsByCharacteristics(org_id: string, query?: string | null): Promise<Pet[] | null>
    findPetById(id: string): Promise<Pet | null>
}