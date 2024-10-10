import { Prisma, Organization } from '@prisma/client'

export interface OrganizationsRepository {
    create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
    findById(id: string): Promise<Organization | null>
    findByCity(city: string): Promise<Organization[] | null>
}

