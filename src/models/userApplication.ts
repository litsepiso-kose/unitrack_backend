import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import base_model from "./base_model.js";

export interface UserApplicationQueryHelpers {
}

@pre<UserApplication>("save", function () {
    this.created_on = new Date().toISOString();
})

export default class UserApplication extends base_model {
    @prop({ type: String, required: true })
    userId: String;

    @prop({ type: String, required: true })
    applicationId: String

    @prop({ type: Number, required: true })
    status: Number;
}

export const UserApplicationModel = getModelForClass<
    typeof UserApplication,
    UserApplicationQueryHelpers
>(UserApplication, {
    options: { customName: "UserApplication" },
});

export enum ApplicationStatus {
    NotApplied = 0,
    Applied = 1,
    Pending = 2,
    Accepted = 3,
    Rejected = 4,
    Delete = 5
}
