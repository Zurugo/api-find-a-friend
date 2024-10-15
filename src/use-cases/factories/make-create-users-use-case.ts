import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { CreateUserUseCase } from "../create-users"

export function makeCreateUsersUseCase() {
    const usersRepository = new PrismaUsersRepository
    const createUseCase = new CreateUserUseCase(usersRepository)

    return createUseCase
}