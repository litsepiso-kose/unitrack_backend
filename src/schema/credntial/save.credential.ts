import { InputType, Field } from "type-graphql";

@InputType()
export class CredentialInput {
  @Field(() => String, { nullable: true })
  userId: String;
  @Field(() => String)
  name: String;
  @Field(() => String)
  surname: String;
  @Field(() => String)
  dob: String;
  @Field(() => String)
  idNumberOrPassport: String;
  @Field(() => String)
  nationality: String;
  @Field(() => String)
  gender: String;
  @Field(() => String)
  homeLanguage: String;
  @Field(() => String)
  resAddress: String;
  @Field(() => String)
  postAddress: String;
  @Field(() => String)
  phoneNumber: String;
  @Field(() => String)
  parentOrGuardian: String;
  @Field(() => String)
  emailAddress: String;
  @Field(() => String)
  parentOrGuardianPhoneNumber: String;
  @Field(() => String)
  parentOrGuardianEmail: String;
  @Field(() => String)
  parentOrGuardianOccupation: String;
  @Field(() => String)
  parentOrGuardianWorkPhoneNumber: String;
  @Field(() => String)
  parentOrGuardianWorkAddress: String;
  @Field(() => String)
  parentOrGuardianHouseholdIncome: String;
  @Field(() => String)
  schoolName: String;
  @Field(() => String)
  examinationBoard: String;
  @Field(() => String)
  grade12Results: String;
  @Field(() => String)
  grade11Results: String;
}
