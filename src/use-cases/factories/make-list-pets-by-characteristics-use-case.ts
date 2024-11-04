import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organizations-repository"
import { ListAvailablePetsByCharacteristics } from "../list-pets"

export function makeListAvailablePets() {
    const organizationsRepository = new PrismaOrganizationRepository()
    const petsRepository = new PrismaPetsRepository()
    const useCase = new ListAvailablePetsByCharacteristics(organizationsRepository, petsRepository)

    return useCase
}