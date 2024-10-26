import { ApplicationDataModel } from "../models/applicationData.js";
import { UserApplicationModel } from "../models/userApplication.js";
import { ApplicationDataOutput, UserApplicationInput, UserApplicationOutput } from "../schema/application/submit.application.js";


export default class ApplicationService {
    async updateApplication(input: UserApplicationInput): Promise<UserApplicationOutput> {
        try {
            let userApplication;

            if (input.id) {
                // Find the existing application by ID
                userApplication = await UserApplicationModel.findById(input.id);

                if (userApplication) {
                    // Update existing fields
                    userApplication.status = input.status !== undefined ? input.status : userApplication.status;

                    // Save the updated document
                    await userApplication.save();
                } else {
                    // If no document found with the provided ID, create a new one
                    userApplication = new UserApplicationModel({
                        ...input,
                        id: input.id,
                    });
                    await userApplication.save();
                }
            } else {
                // If no ID provided, create a new UserApplication
                userApplication = new UserApplicationModel({
                    userId: input.userId,
                    applicationId: input.applicationId,
                    status: input.status || 0, // Default status if not provided
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
                id: input.id || "",
                userId: input.userId,
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
}
