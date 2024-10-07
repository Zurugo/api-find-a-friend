import { Organization, Prisma } from "@prisma/client"
import { OrganizationsRepository } from "../orgs-repository"
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
    public items: Organization[] = []

    async create(data: Prisma.OrganizationUncheckedCreateInput) {
        const organization = {
            id: randomUUID(),
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