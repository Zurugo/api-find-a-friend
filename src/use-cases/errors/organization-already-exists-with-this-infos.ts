export class OrganizationAlreadyExistsWithThisInfos extends Error {
    constructor() {
        super('This organization is already exists')
    }
}