import { Mutation, Resolver, Arg, Query, Ctx } from "type-graphql";
import { VerifyTokenOutput } from "../schema/user/token.verify.js";
import UserService from "../services/user.service.js";
import { SigninOutput, SigninInput } from "../schema/user/signin.user.js";
import { SignupInput, } from "../schema/user/create.user.js";
import Context from "../models/context.js";
import { UserType } from "../models/user.js";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Query(() => String)
  async test(): Promise<String> {
    return "Success";
  }

  @Mutation(() => VerifyTokenOutput)
  async verifyToken(
    @Arg("input") inputToken: string
  ): Promise<VerifyTokenOutput> {
    return this.userService.verifyToken(inputToken);
  }

  @Mutation(() => SigninOutput)
  async signin(@Arg("input") input: SigninInput) {
    return this.userService.signin(input);
  }

  @Mutation(() => Boolean)
  async signup(@Arg("input") input: SignupInput) {
    return this.userService.signUp(input.email, input.password, input.email);
  }

  @Mutation(() => Boolean)
  async passwordUpdate(@Arg("password") password: String, @Ctx() { user: { _id } }: Context) {
    // console.log(password);
    return this.userService.passwordUpdate(password, _id);
  }

  @Mutation(() => Boolean)
  async setUserType(@Arg("userType") userType: UserType, @Ctx() { user: { _id } }: Context) {
    return this.userService.setUserType(userType, _id);
  }

  @Mutation(() => Boolean)
  async setUserLanguage(@Arg("voiceLanguage") voiceLanguage: String, @Ctx() { user: { _id } }: Context) {
    return this.userService.setUserVoiceLanguage(voiceLanguage, _id);
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: String): Promise<Boolean> {
    return this.userService.forgotPassword(email);
  }

  @Mutation(() => Boolean)
  async resetPassword(@Arg("token") token: String, @Arg("newPassword") newPassword: String,): Promise<Boolean> {
    return this.userService.resetPassword(token, newPassword);
  }
}
