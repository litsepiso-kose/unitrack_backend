 import CredentialService from "../services/credential.service.js";
import { Mutation, Resolver,  Arg } from "type-graphql";
import { CredentialInput } from "../schema/credntial/save.credential.js";
import { CredentialOutput } from "../schema/credntial/get.credential.js";


@Resolver()
export default class CredentialResolver {
    constructor(private credentialService: CredentialService) {
        this.credentialService = new CredentialService();
    }

    @Mutation(() => CredentialOutput)
    async saveCredential(@Arg("input") input: CredentialInput): Promise<CredentialOutput> {
        return this.credentialService.saveCredential(input);
    }
}
