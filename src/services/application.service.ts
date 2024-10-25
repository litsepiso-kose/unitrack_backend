import ApplicationClass, { ApplicationModel, ApplicationType, Statuses } from "../models/application.js";
import BursaryClass, { BursaryModel } from "../models/bursary.js";
import UniversityClass, { UniversityModel } from "../models/universtiy.js";
import { ApplicationInput, ApplicationOutput, } from "../schema/application/submit.application.js";

export default class ApplicationService {
    async submitApplication(input: ApplicationInput, userId: String): Promise<ApplicationOutput> {
        try {
            // First, create the application and save it to get its primary key (applicationId)
            const newApplication: Partial<ApplicationClass> = {
                userId: userId,
                type: input.type,
                deadline: input.deadline,
                status: Statuses.Applied, // Default to 'pending' if not provided
            };

            // Save the application and retrieve its ID
            const savedApplication = await ApplicationModel.create(newApplication);
            const applicationId = savedApplication._id;

            // Based on the type, create and save a Bursary or University with applicationId as foreign key
            if (input.type === ApplicationType.B) {
                const newBursary: BursaryClass = {
                    name: input.name,
                    description: input.description,
                    url: input.url,
                    applicationId: applicationId, // Set the applicationId in Bursary
                };
                await BursaryModel.create(newBursary);
            } else if (input.type === ApplicationType.U) {
                const newUniversity: UniversityClass = {
                    name: input.name,
                    fullName: input.fullName || input.name, // Ensure fullName is handled
                    url: input.url,
                    applicationId: applicationId, // Set the applicationId in University
                };
                await UniversityModel.create(newUniversity);
            } else {
                throw new Error("Invalid application type.");
            }

            // Update the application with the applicationId as typeId after saving Bursary/University
            await ApplicationModel.findByIdAndUpdate(applicationId, { typeId: applicationId });

            // Create the output object to return
            let output: ApplicationOutput = new ApplicationOutput()

            output = {
                name: input.name,
                description: input.description,
                url: input.url,
                fullName: input.fullName,
                typeId: applicationId,
                deadline: input.deadline,
                status: savedApplication.status,
                type: input.type,
                succeeded: true,
                messages: ["Application saved successfully"],
                id: savedApplication.id
            };

            return output;

        } catch (error) {
            // Handle any errors and return error message
            return {
                succeeded: false,
                messages: [`Failed to submit application: ${error.message}`],
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
                let fullName = "";
                let description = "";
                let url = "";

                if (type === 0) { // Bursary type
                    const bursary = await BursaryModel.findOne({ applicationId: app._id }).exec();
                    if (bursary) {
                        fullName = bursary.name as string;
                        description = bursary.description as string;
                        url = bursary.url as string;
                    }
                } else if (type === 1) { // University type
                    const university = await UniversityModel.findOne({ applicationId: app._id }).exec();
                    if (university) {
                        fullName = university.fullName as string;
                        description = university.name as string; // Using name as placeholder for description
                        url = university.url as string;
                    }
                }

                return {
                    name: fullName,
                    description: description,
                    url: url,
                    fullName: fullName,
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
}
