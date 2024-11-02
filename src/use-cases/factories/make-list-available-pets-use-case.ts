import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organizations-repository"
import { ListAvailablePetsByCityUseCase } from "../list-available-pets"

export function makeListAvailablePetsByCityUseCase() {
    const organizationsRepository = new PrismaOrganizationRepository()
    const petsRepository = new PrismaPetsRepository()
    const useCase = new ListAvailablePetsByCityUseCase(organizationsRepository, petsRepository)

    return useCase
}