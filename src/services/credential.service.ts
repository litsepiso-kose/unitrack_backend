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
                idNumberOrPassport: savedCredential.idNumberOrPassport,
                nationality: savedCredential.nationality,
                gender: savedCredential.gender,
                homeLanguage: savedCredential.homeLanguage,
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

    async getCredential(userId: String): Promise<CredentialOutput> {
        const credential = await CredentialModel.findOne({ userId });

        if (!credential) {
            return {
                userId,
                messages: [`No credentials found for userId: ${userId}`],
            };
        }

        return {
            userId: credential.userId,
            name: credential.name,
            surname: credential.surname,
            dob: credential.dob,
            idNumberOrPassport: credential.idNumberOrPassport,
            nationality: credential.nationality,
            gender: credential.gender,
            homeLanguage: credential.homeLanguage,
            resAddress: credential.resAddress,
            postAddress: credential.postAddress,
            phoneNumber: credential.phoneNumber,
            parentOrGuardian: credential.parentOrGuardian,
            emailAddress: credential.emailAddress,
            parentOrGuardianPhoneNumber: credential.parentOrGuardianPhoneNumber,
            parentOrGuardianEmail: credential.parentOrGuardianEmail,
            parentOrGuardianOccupation: credential.parentOrGuardianOccupation,
            parentOrGuardianWorkPhoneNumber: credential.parentOrGuardianWorkPhoneNumber,
            parentOrGuardianWorkAddress: credential.parentOrGuardianWorkAddress,
            parentOrGuardianHouseholdIncome: credential.parentOrGuardianHouseholdIncome,
            schoolName: credential.schoolName,
            examinationBoard: credential.examinationBoard,
            grade12Results: credential.grade12Results,
            grade11Results: credential.grade11Results,
            messages: []
        };
    }

}