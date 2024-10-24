import {
    getModelForClass,
    prop,
    pre,
} from "@typegoose/typegoose";
import base_model from "./base_model.js";

export interface ApplicationClassQueryHelpers {
}

@pre<ApplicationClass>("save", async function () {
    this.created_on = new Date().toISOString();
})

export default class ApplicationClass extends base_model {
    @prop({ type: String, required: true })
    userId: String;

    @prop({ type: String, required: true })
    typeId: String;

    @prop({ type: String, required: true })
    type: "Bursary" | "University";;

    @prop({ type: String, required: true })
    deadline: String;

    @prop({ type: String, required: true })
    status: String;
}

export const ApplicationModel = getModelForClass<
    typeof ApplicationClass,
    ApplicationClassQueryHelpers
>(ApplicationClass, {
    options: { customName: "Application" },
});
