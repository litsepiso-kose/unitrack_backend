import ApplicationClass, { ApplicationModel, Statuses } from "../models/application.js";
import { ApplicationInput, ApplicationOutput, } from "../schema/application/submit.application.js";

export default class ApplicationService {
    async updateApplication(input: ApplicationInput): Promise<ApplicationOutput> {
        try {
            // Find the application by ID
            const application = await ApplicationModel.findById(input.id);
            if (!application) {
                return {
                    messages: ["Application not found"],
                    succeeded: false,
                    id: null
                };
            }

            // Update application fields
            application.deadline = input.deadline || application.deadline;
            application.status = input.status || application.status;
            application.name = input.name
            application.url = input.url
            application.description = input.description

            // Return updated ApplicationOutput
            return {
                name: input.name, // Assuming userId as a placeholder for name
                description: application.description,
                url: application.url,
                typeId: application._id.toString(),
                deadline: application.deadline,
                status: application.status,
                type: application.type,
                messages: ["Application updated successfully"],
                succeeded: true,
                id: application.id
            };

        } catch (error) {
            console.error("Error updating application:", error);
            return {
                messages: [`Failed to update application: ${error.message}`],
                succeeded: false,
                id: null
            };
        }
    }

    async submitApplication(input: ApplicationInput, userId: String): Promise<ApplicationOutput> {
        try {
            // First, create the application and save it to get its primary key (applicationId)
            const newApplication: Partial<ApplicationClass> = {
                userId: userId,
                type: input.type,
                deadline: input.deadline,
                status: Statuses.Applied,
                url: input.url,
                name: input.name,
                description: input.description
            };

            const savedApplication = await ApplicationModel.create(newApplication);

            return {
                name: input.name,
                description: input.description,
                url: input.url,
                deadline: input.deadline,
                status: Statuses.Applied,
                type: input.type,
                succeeded: true,
                messages: ["Application saved successfully"],
                id: savedApplication.id
            };
        } catch (error) {
            console.error(error.message)
            return {
                succeeded: false,
                messages: [`Failed to submit application `],
                id: null
            };
        }
    }

    async getApplications(userId: string, type: Number): Promise<ApplicationOutput[]> {
        try {
            // Find applications that match the userId and type
            const applications = await ApplicationModel.find({ userId: userId, type: type });

            // Iterate over applications and fetch additional details from University or Bursary
            const output = await Promise.all(applications.map(async (app) => {

                return {
                    name: app.name,
                    description: app.description,
                    url: app.url,
                    typeId: app._id.toString(),
                    deadline: app.deadline,
                    status: app.status,
                    type: app.type,
                    messages: ["Application fetched successfully"],
                    succeeded: true,
                    id: app.id
                } as ApplicationOutput;
            }));

            return output;

        } catch (error) {
            return [{
                messages: [`Failed to fetch applications: ${error.message}`],
                succeeded: false,
                id: null
            }];
        }
    }

    async getApplication(id: String): Promise<ApplicationOutput> {
        try {
            // Find the application by id
            const application = await ApplicationModel.findById(id);

            if (!application) {
                return {
                    messages: ["Application not found"],
                    succeeded: false,
                    id: null
                };
            }

            // Create the output object to return
            return {
                name: application.name, // Assuming you may want to use userId as a placeholder for name
                description: application.description,
                url: application.url,
                typeId: application._id.toString(),
                deadline: application.deadline,
                status: application.status,
                type: application.type,
                messages: ["Application fetched successfully"],
                succeeded: true,
                id: application.id
            };

        } catch (error) {
            console.error("Error fetching application:", error);
            return {
                messages: [`Failed to fetch application: ${error.message}`],
                succeeded: false,
                id: null
            };
        }
    }

}
