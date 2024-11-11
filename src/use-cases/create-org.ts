import { OrganizationsRepository } from "@/repositories/orgs-repository"
import { UsersRepository } from "@/repositories/users-repository"
import { Organization } from '@prisma/client'
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface CreateOrganizaitonUseCaseRequest {
    cep: string
    state: string
    city: string
    district: string
    street: string
    number: string
    phone: string
    user_id: string
}

interface CreateOrganizationUseCaseResponse {
    organization: Organization
}

export class CreateOrganizationUseCase {
    constructor(
        private organizationsRepository: OrganizationsRepository,
        private usersRepository: UsersRepository
    ){}


    async execute({
        cep,
        state,
        city,
        district,
        street,
        number,
        phone,
        user_id,
    }: CreateOrganizaitonUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
        console.log(user_id)
        const user = await this.usersRepository.findById(user_id)

        if(!user) {
            throw new ResourceNotFoundError()
        }

        const organization = await this.organizationsRepository.create({
            cep,
            state,
            city,
            district,
            street,
            number,
            phone,
            user_id,
        })

        return {
            organization
        }
        
    }
}

