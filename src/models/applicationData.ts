import {
    getModelForClass,
    prop,
    pre,
} from "@typegoose/typegoose";
import base_model from "./base_model.js";

export interface ApplicationDataQueryHelpers {
}

@pre<ApplicationData>("save", async function () {
    this.created_on = new Date().toISOString();
})

export default class ApplicationData extends base_model {
    @prop({ type: String, required: true })
    name: string;

    @prop({ type: String, required: true })
    description: string;

    @prop({ type: Number, required: true, enum: [0, 1] })
    type: number; // 0 for bursary, 1 for university

    @prop({ type: String, required: true })
    deadline: string;

    @prop({ type: [String], required: false })
    courses?: string[]; // Optional field for courses, only relevant for universities

    @prop({ type: String, required: true })
    applyLink: string;
}

export const ApplicationDataModel = getModelForClass<
    typeof ApplicationData,
    ApplicationDataQueryHelpers
>(ApplicationData, {
    options: { customName: "ApplicationData" },
});
