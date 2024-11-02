import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { ListAvailablePetsByCharacteristics } from "../list-pets-by-characteristics"

export function makeListAvailablePetsByCityUseCase() {
    const petsRepository = new PrismaPetsRepository()
    const useCase = new ListAvailablePetsByCharacteristics(petsRepository)

    return useCase
}