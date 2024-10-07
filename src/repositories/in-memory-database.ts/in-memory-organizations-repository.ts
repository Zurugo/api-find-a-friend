import { Organization, Prisma } from "@prisma/client"
import { OrganizationsRepository } from "../orgs-repository"
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
    public items: Organization[] = []

    async findById(id: string) {
        const organization = this.items.find((item) => item.id === id)

        if (!organization) {
            return null
        }

        return organization
    }

    async create(data: Prisma.OrganizationUncheckedCreateInput) {
        const organization = {
            id: data.id ?? randomUUID(),
            cep: data.cep,
            address: data.address,
            phone: data.phone,
            user_id: data.user_id,
            created_at: new Date()
        }

        this.items.push(organization)

        return organization
    }
}