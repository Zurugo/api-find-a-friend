export class OrganizationIsRequired extends Error {
    constructor() {
        super('Organization not found, please send a valid organization')
    }
}