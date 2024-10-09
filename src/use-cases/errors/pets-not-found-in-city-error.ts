export class PetsNotAvailableInCity extends Error {
    constructor() {
        super('No pets available in city of choice')
    }
}