import { Authorized, Query, Resolver } from "type-graphql";
import { ApplicationDataOutput } from "../schema/application/submit.application.js";
import ApplicationService from "../services/application.service.js";

@Resolver()
export default class ApplicationResolver {
    constructor(private applicationService: ApplicationService) {
        this.applicationService = new ApplicationService();
    }

    @Authorized()
    @Query(() => [ApplicationDataOutput])
    async getAllApplications(): Promise<ApplicationDataOutput[]> {
        return this.applicationService.getAllApplications();
    }
}
