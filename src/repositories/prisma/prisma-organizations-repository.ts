import { prisma } from '@/lib/prisma'
import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../orgs-repository'

export class PrismaOrganizationRepository implements OrganizationsRepository {
    async findById(id: string) {
        const organization = await prisma.organization.findUnique({
            where: {
                id,
            }
        })

        return organization
    }

    async findManyOrgsByCity(city: string, page: number) {
        const organizations = await prisma.organization.findMany({
            where: {
                city: {
                    contains: city
                },
            },
            take: 20,
            skip: (page -1) * 20
        })

        return organizations
    }

    async create(data: Prisma.OrganizationUncheckedCreateInput) {
        const organization = await prisma.organization.create({
            data,
        })

        return organization
    }
    
}