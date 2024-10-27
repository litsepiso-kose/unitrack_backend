import {
    getModelForClass,
    prop,
    pre,
} from "@typegoose/typegoose";
import base_model from "./base_model.js";

export interface NotificationQueryHelpers {
}

@pre<Notification>("save", async function () {
    this.created_on = new Date().toISOString();
})

export default class Notification extends base_model {
    @prop({ type: String, required: true })
    userId: String;

    @prop({ type: String, required: true })
    applicationId: String

    @prop({ type: Number, required: true })
    status: Number;
}

export const NotificationModel = getModelForClass<
    typeof Notification,
    NotificationQueryHelpers
>(Notification, {
    options: { customName: "Notification" },
});
