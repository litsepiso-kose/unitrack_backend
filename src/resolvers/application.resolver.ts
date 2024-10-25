import { Authorized, Mutation, Arg, Ctx, Resolver, Query } from "type-graphql";
import { Context } from "vm";
import { ApplicationOutput, ApplicationInput } from "../schema/application/submit.application.js";
import ApplicationService from "../services/application.service.js";

@Resolver()
export default class ApplicationResolver {
    constructor(private applicationService: ApplicationService) {
        this.applicationService = new ApplicationService();
    }

    @Authorized()
    @Mutation(() => ApplicationOutput)
    async saveApplication(@Arg("input") input: ApplicationInput, @Ctx() { user: { _id } }: Context): Promise<ApplicationOutput> {
        return input.id ? this.applicationService.updateApplication(input) : this.applicationService.submitApplication(input, _id);
    }

    @Authorized()
    @Query(() => [ApplicationOutput])
    async getApplications(@Arg("type") type: Number, @Ctx() { user: { _id } }: Context): Promise<ApplicationOutput[]> {
        return this.applicationService.getApplications(_id, type);
    }

    @Authorized()
    @Query(() => ApplicationOutput)
    async getApplication(@Arg("id") id: String): Promise<ApplicationOutput> {
        return this.applicationService.getApplication(id);
    }
}
