import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organizations-repository"
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { CreatePetUseCase } from "../create-pets"

export function makeCreatePetUseCase() {
    const organizationsRepository = new PrismaOrganizationRepository()
    const petsRepository = new PrismaPetsRepository()
    const useCase = new CreatePetUseCase(petsRepository, organizationsRepository)

    return useCase
}