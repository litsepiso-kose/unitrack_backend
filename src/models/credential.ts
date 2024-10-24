import {
    getModelForClass,
    prop,
    pre,
} from "@typegoose/typegoose";
import base_model from "./base_model.js";

export interface CredentialClassQueryHelpers {
}

@pre<CredentialClass>("save", async function () {
    this.created_on = new Date().toISOString();
})

export default class CredentialClass extends base_model {
    @prop({ type: String, required: true })
    userId: String;

    @prop({ type: String, required: true })
    name: String;

    @prop({ type: String, required: true })
    surname: String;

    @prop({ type: String, required: true })
    dob: String;

    @prop({ type: String, required: true })
    idNumberOrPassport: String;

    @prop({ type: String, required: true })
    nationality: String;

    @prop({ type: String, required: true })
    gender: String;

    @prop({ type: String, required: true })
    homeLanguage: String;

    @prop({ type: String, required: true })
    resAddress: String;

    @prop({ type: String, required: true })
    postAddress: String;

    @prop({ type: String, required: true })
    emailAddress: String;

    @prop({ type: String, required: true })
    phoneNumber: String;

    @prop({ type: String, required: true })
    parentOrGuardian: String;

    @prop({ type: String, required: true })
    parentOrGuardianPhoneNumber: String;

    @prop({ type: String, required: true })
    parentOrGuardianEmail: String;

    @prop({ type: String, required: true })
    parentOrGuardianOccupation: String;

    @prop({ type: String, required: true })
    parentOrGuardianWorkPhoneNumber: String;

    @prop({ type: String, required: true })
    parentOrGuardianWorkAddress: String;

    @prop({ type: String, required: true })
    parentOrGuardianHouseholdIncome: String;

    @prop({ type: String, required: true })
    schoolName: String;

    @prop({ type: String, required: true })
    examinationBoard: String;

    @prop({ type: String, required: true })
    grade12Results: String;

    @prop({ type: String, required: true })
    grade11Results: String;
}

export const CredentialModel = getModelForClass<
    typeof CredentialClass,
    CredentialClassQueryHelpers
>(CredentialClass, {
    options: { customName: "Credential" },
});
