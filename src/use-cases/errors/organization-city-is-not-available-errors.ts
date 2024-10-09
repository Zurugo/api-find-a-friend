export class OrganizationCityNotAvailable extends Error {
    constructor() {
        super('This city is not available for this pet')
    }
}