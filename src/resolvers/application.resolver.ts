import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ApplicationDataOutput, UserApplicationInput, UserApplicationOutput } from "../schema/application/submit.application.js";
import ApplicationService from "../services/application.service.js";
import Context from "../models/context.js";

@Resolver()
export default class ApplicationResolver {
    constructor(private applicationService: ApplicationService) {
        this.applicationService = new ApplicationService();
    }

    @Authorized()
    @Query(() => [ApplicationDataOutput])
    async getUserApplications(@Arg("type") type: Number, @Ctx() { user: { _id } }: Context): Promise<ApplicationDataOutput[]> {
        return this.applicationService.getUserApplications(type, _id);
    }

    @Authorized()
    @Query(() => [ApplicationDataOutput])
    async getAllApplications(): Promise<ApplicationDataOutput[]> {
        return this.applicationService.getAllApplications();
    }

    @Authorized()
    @Query(() => ApplicationDataOutput)
    async getApplicationById(@Arg("id") id: String,): Promise<ApplicationDataOutput> {
        return this.applicationService.getApplicationById(id);
    }

    @Authorized()
    @Mutation(() => UserApplicationOutput)
    async updateApplication(@Arg("input") input: UserApplicationInput, @Ctx() { user: { _id } }: Context): Promise<UserApplicationOutput> {
        return this.applicationService.updateApplication(input, _id);
    }
}
