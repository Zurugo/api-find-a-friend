import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organizations-repository"
import { CreateOrganizationUseCase } from "../create-org"

export function makeCreateOrganizationsUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const organizationsRepository = new PrismaOrganizationRepository()

    const useCase = new CreateOrganizationUseCase(organizationsRepository, usersRepository)

    return useCase
}