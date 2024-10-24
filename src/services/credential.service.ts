import CredentialClass, { CredentialModel } from "../models/credential.js";
import { CredentialOutput } from "../schema/credntial/get.credential.js";
import { CredentialInput } from "../schema/credntial/save.credential.js";

export default class CredentialService {
    async saveCredential(input: CredentialInput): Promise<CredentialOutput> {
        try {
            const newCredential: CredentialClass = { ...input };

            const savedCredential = await CredentialModel.create(newCredential); 

            const output: CredentialOutput = {
                userId: savedCredential.userId,
                name: savedCredential.name,
                surname: savedCredential.surname,
                dob: savedCredential.dob,
                idNumber: savedCredential.idNumberOrPassport,
                nationality: savedCredential.nationality,
                gender: savedCredential.gender,
                home_language: savedCredential.homeLanguage,
                resAddress: savedCredential.resAddress,
                postAddress: savedCredential.postAddress,
                phoneNumber: savedCredential.phoneNumber,
                parentOrGuardian: savedCredential.parentOrGuardian,
                messages: ["Credential saved successfully"],
            };

            return output;

        } catch (error) {
            return {
                messages: [`Failed to save credential: ${error.message}`],
            };
        }
    }
}