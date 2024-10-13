import {
    getModelForClass,
    index,
    prop,
    // index,
} from "@typegoose/typegoose";
import base_model from "./base_model.js";


export interface UserOTPClassQueryHelpers {
}

@index({ token: 1, userId: 1 }, { unique: false })
export default class UserOTPClass extends base_model {
    @prop({ type: String, required: true })
    otp!: String;

    @prop({ type: String, required: true })
    userId!: String;

    @prop({ type: Number, required: true })
    otpExpiry!: Number;
}

export const UserOTPModel = getModelForClass<
    typeof UserOTPClass,
    UserOTPClassQueryHelpers
>(UserOTPClass, {
    options: { customName: "UserOTP" },
});
