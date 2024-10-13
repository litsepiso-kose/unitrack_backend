import CredentialClass, { CredentialModel } from "../models/credential.js";
import { CredentialOutput } from "../schema/credntial/get.credential.js";
import { CredentialInput } from "../schema/credntial/save.credential.js";

export default class CredentialService {
    async saveCredential(input: CredentialInput): Promise<CredentialOutput> {
        try {
            // Create a new credential entry using the input data
            const newCredential: CredentialClass = {
                userId: input.userId,
                name: input.name,
                surname: input.surname,
                dob: input.dob,
                idNumber: input.idNumber,
                nationality: input.nationality,
                gender: input.gender,
                home_language: input.home_language,
                resAddress: input.resAddress,
                postAddress: input.postAddress,
                phoneNumber: input.phoneNumber,
                parentOrGuardian: input.parentOrGuardian,
            };

            // Save the new credential to the database
            const savedCredential = await CredentialModel.create(newCredential); // Assuming you have a save method from ORM

            // Prepare the output
            const output: CredentialOutput = {
                userId: savedCredential.userId,
                name: savedCredential.name,
                surname: savedCredential.surname,
                dob: savedCredential.dob,
                idNumber: savedCredential.idNumber,
                nationality: savedCredential.nationality,
                gender: savedCredential.gender,
                home_language: savedCredential.home_language,
                resAddress: savedCredential.resAddress,
                postAddress: savedCredential.postAddress,
                phoneNumber: savedCredential.phoneNumber,
                parentOrGuardian: savedCredential.parentOrGuardian,
                messages: ["Credential saved successfully"],
            };

            return output;

        } catch (error) {
            // Handle errors and return appropriate messages
            return {
                messages: [`Failed to save credential: ${error.message}`],
            };
        }
    }
}