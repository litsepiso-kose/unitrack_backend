import { UserOTPModel } from "../models/user_otp.js";


export default class UserOTPService {
    async generateOtp(userId: String): Promise<String> {
        const otp = generateOtp()
        const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes from now

        await UserOTPModel.create({ userId, otp, otpExpiry })
        return otp
    }

    async validateOtp(inputOtp: String, userId: String) {
        const userOtp = await UserOTPModel.findOne({ userId })

        if (!userOtp) {
            throw new Error('Token not found');
        }

        if (userOtp.otp === inputOtp && Date.now() <= userOtp.otpExpiry.valueOf()) {
            await UserOTPModel.deleteMany({ userId })
            return true;
        } else {
            return false;
        }
    }
}

export function generateOtp(length = 6) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}
