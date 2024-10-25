import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"

import { AuthenticateUsecase } from "../authenticate"

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUsecase = new AuthenticateUsecase(usersRepository)

    return authenticateUsecase
}