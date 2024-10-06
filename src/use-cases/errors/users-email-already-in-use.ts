export class UserAlreadyExists extends Error {
    constructor() {
        super('This e-mail is already in use.')
    }
}