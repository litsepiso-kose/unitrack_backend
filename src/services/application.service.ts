import ApplicationClass, { ApplicationModel } from "../models/application.js";
import BursaryClass, { BursaryModel } from "../models/bursary.js";
import UniversityClass, { UniversityModel } from "../models/universtiy.js";
import { ApplicationInput, ApplicationOutput } from "../schema/application/submit.application.js";

export default class ApplicationService {
    async submitApplication(input: ApplicationInput, userId: String): Promise<ApplicationOutput> {
        try {
            // Create a new application object using only the necessary fields for ApplicationModel
            const newApplication: Partial<ApplicationClass> = {
                typeId: input.typeId,
                userId: userId,
                type: input.type,
                deadline: input.deadline,
                status: input.status || 'pending',  // Default to 'pending' if status is not provided
            };

            // Save the new application in the database
            const savedApplication = await ApplicationModel.create(newApplication);

            // Based on the type of application, either Bursary or University
            if (input.type === "Bursary") {
                const newBursary: BursaryClass = {
                    name: input.name,
                    description: input.description,
                    url: input.url,
                    applicationId: savedApplication._id,  // Link the application with the bursary
                };
                await BursaryModel.create(newBursary);
            } else if (input.type === "University") {
                const newUniversity: UniversityClass = {
                    name: input.name,
                    fullName: input.fullName || input.name, // Ensure fullName is handled
                    url: input.url,
                    applicationId: savedApplication._id,  // Link the application with the university
                };
                await UniversityModel.create(newUniversity);
            }

            // Create the output object to return
            const output: ApplicationOutput = {
                name: input.name,
                description: input.description,
                url: input.url,
                fullName: input.fullName,
                typeId: input.typeId,
                deadline: input.deadline,
                status: savedApplication.status,
                type: input.type,
                messages: ["Application saved successfully"],
            };

            return output;

        } catch (error) {
            // Handle any errors and return error message
            return {
                messages: [`Failed to submit application: ${error.message}`],
            };
        }
    }
}
