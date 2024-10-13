import { InputType, Field } from "type-graphql";

@InputType()
export class CredentialInput {
  @Field(() => String)
  userId: String;

  @Field(() => String)
  name: String;

  @Field(() => String)
  surname: String;

  @Field(() => String)
  dob: String;

  @Field(() => String)
  idNumber: String;

  @Field(() => String)
  nationality: String;

  @Field(() => String)
  gender: String;

  @Field(() => String)
  home_language: String;

  @Field(() => String)
  resAddress: String;

  @Field(() => String)
  postAddress: String;

  @Field(() => String)
  phoneNumber: String;

  @Field(() => String)
  parentOrGuardian: String;
}
