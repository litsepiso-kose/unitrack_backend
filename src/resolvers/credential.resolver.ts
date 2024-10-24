import CredentialService from "../services/credential.service.js";
import { Mutation, Resolver, Arg, Authorized, Ctx, Query } from "type-graphql";
import { CredentialInput } from "../schema/credntial/save.credential.js";
import { CredentialOutput } from "../schema/credntial/get.credential.js";
import Context from "../models/context.js";


@Resolver()
export default class CredentialResolver {
    constructor(private credentialService: CredentialService) {
        this.credentialService = new CredentialService();
    }

    @Authorized()
    @Mutation(() => CredentialOutput)
    async saveCredential(@Arg("input") input: CredentialInput, @Ctx() { user: { _id } }: Context): Promise<CredentialOutput> {
        if (!input.userId) input.userId = _id;
        return this.credentialService.saveCredential(input);
    }

    @Authorized()
    @Query(() => CredentialOutput)
    async getCredential(@Ctx() { user: { _id } }: Context): Promise<CredentialOutput> {
        return this.credentialService.getCredential(_id);
    }
}
