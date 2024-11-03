export class ParameterCityIsRequired extends Error {
    constructor() {
        super('City is required parameter for search a pets')
    }
}