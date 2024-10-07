import { UsersRepository } from "@/repositories/users-repository"
import { User } from '@prisma/client'
import { UserAlreadyExists } from "./errors/users-email-already-in-use"
import { hash } from 'bcryptjs'


interface CreateUsersUseCaseRequest {
    name: string
    email: string
    password: string,
}

interface CreateUsersUseCaseResponse {
    user: User
}

export class CreateUserUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute({
        name,
        email,
        password,
    }: CreateUsersUseCaseRequest): Promise<CreateUsersUseCaseResponse> {
        const password_hash = await hash(password, 6)

        const getUserWithSameEmail = await this.usersRepository.findByEmail(email)

        if (getUserWithSameEmail) {
            throw new UserAlreadyExists()
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        })

        return {
            user
        }
    }



}