import {
    getModelForClass,
    prop,
    pre,
} from "@typegoose/typegoose";
import base_model from "./base_model.js";

export interface BursaryClassQueryHelpers {
}

@pre<BursaryClass>("save", async function () {
    this.created_on = new Date().toISOString();
})

export default class BursaryClass extends base_model {
    @prop({ type: String, required: true })
    name: String;

    @prop({ type: String, required: true })
    description: String;

    @prop({ type: String, required: true })
    url: String;

    @prop({ type: String, required: true })
    applicationId: String;
}

export const BursaryModel = getModelForClass<
    typeof BursaryClass,
    BursaryClassQueryHelpers
>(BursaryClass, {
    options: { customName: "Bursary" },
});
