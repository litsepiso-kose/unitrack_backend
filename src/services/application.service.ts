import { ApplicationDataModel } from "../models/applicationData.js";
import { ApplicationStatus, UserApplicationModel } from "../models/userApplication.js";
import { ApplicationDataOutput, UserApplicationInput, UserApplicationOutput } from "../schema/application/submit.application.js";


export default class ApplicationService {
    async updateApplication(input: UserApplicationInput, userId: String): Promise<UserApplicationOutput> {
        try {
            let userApplication;

            if (input.applicationId) {
                // Find the existing application by ID
                userApplication = await UserApplicationModel.findOne({ applicationId: input.applicationId, userId });

                if (userApplication) {
                    // Update existing fields
                    userApplication.status = input.status !== undefined ? input.status : userApplication.status;

                    // Save the updated document
                    await userApplication.save();
                } else {
                    // If no document found with the provided ID, create a new one
                    userApplication = new UserApplicationModel({
                        userId: userId,
                        applicationId: input.applicationId,
                        status: input.status,
                    });
                    await userApplication.save();
                }
            } else {
                // If no ID provided, create a new UserApplication
                userApplication = new UserApplicationModel({
                    userId: userId,
                    applicationId: input.applicationId,
                    status: ApplicationStatus.Applied
                });
                await userApplication.save();
            }

            return {
                id: userApplication._id.toString(),
                userId: userApplication.userId,
                applicationId: userApplication.applicationId,
                status: userApplication.status,
                messages: ["Application saved or updated successfully"],
                succeeded: true,
            };
        } catch (error) {
            console.error("Error saving or updating application:", error);
            return {
                id: "",
                userId: userId,
                applicationId: input.applicationId,
                status: input.status || 0,
                messages: ["Error saving or updating application", error.message],
                succeeded: false,
            };
        }
    }

    async getAllApplications(): Promise<ApplicationDataOutput[]> {
        try {
            const applications = await ApplicationDataModel.find();

            return applications.map(app => ({
                id: app._id.toString(),
                name: app.name,
                description: app.description,
                type: app.type,
                deadline: app.deadline,
                courses: app.courses,
                applyLink: app.applyLink,
                messages: ["Application retrieved successfully"],
                succeeded: true
            }));
        } catch (error) {
            console.error("Error retrieving applications:", error);
            throw new Error("Failed to retrieve applications");
        }
    }

    async getApplicationById(id: String): Promise<ApplicationDataOutput> {
        try {
            // Fetch all applications and find the one with the matching id
            const applications = await this.getAllApplications();
            const application = applications.find(app => app.id === id);

            if (!application) {
                throw new Error(`Application with ID ${id} not found`);
            }

            return application;
        } catch (error) {
            console.error("Error retrieving application by ID:", error);
            throw new Error("Failed to retrieve application");
        }
    }

    async getUserApplications(type: Number, userId: String): Promise<ApplicationDataOutput[]> {
        try {
            // Step 1: Fetch UserApplications for the given user
            const userApplications = await UserApplicationModel.find({ userId: userId });

            // Step 2: Extract applicationIds
            const applicationIds = userApplications.map(app => app.applicationId);

            // Step 3: Query ApplicationData using applicationIds and filter by type
            const applications = await ApplicationDataModel.find({
                _id: { $in: applicationIds },
                type: type
            });

            // Step 4: Format the data to match ApplicationDataOutput
            return applications.map(app => ({
                id: app._id.toString(),
                name: app.name,
                description: app.description,
                type: app.type,
                deadline: app.deadline,
                courses: app.courses,
                applyLink: app.applyLink,
                messages: ["Application retrieved successfully"],
                succeeded: true
            }));
        } catch (error) {
            console.error("Error retrieving applications by type and userId:", error);
            throw new Error("Failed to retrieve applications");
        }
    }
}
