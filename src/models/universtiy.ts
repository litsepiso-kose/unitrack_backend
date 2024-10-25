import {
    getModelForClass,
    prop,
    pre,
} from "@typegoose/typegoose";
import base_model from "./base_model.js";

export interface UniversityClassQueryHelpers {
}

@pre<UniversityClass>("save", async function () {
    this.created_on = new Date().toISOString();
})

export default class UniversityClass extends base_model {
    @prop({ type: String, required: true })
    name: String;

    @prop({ type: String, required: true })
    description: String;

    @prop({ type: String, required: true })
    url: String;

    @prop({ type: String, required: true })
    applicationId: String;
}

export const UniversityModel = getModelForClass<
    typeof UniversityClass,
    UniversityClassQueryHelpers
>(UniversityClass, {
    options: { customName: "University" },
});
