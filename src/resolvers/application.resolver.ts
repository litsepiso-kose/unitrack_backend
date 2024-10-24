import { Authorized, Mutation, Arg, Ctx, Resolver } from "type-graphql";
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
        return this.applicationService.submitApplication(input, _id);
    }

}
