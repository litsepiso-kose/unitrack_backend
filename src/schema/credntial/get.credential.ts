import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class CredentialOutput {
  @Field(() => String, { nullable: true })
  userId?: String;

  @Field(() => String, { nullable: true })
  name?: String;

  @Field(() => String, { nullable: true })
  surname?: String;

  @Field(() => String, { nullable: true })
  dob?: String;

  @Field(() => String, { nullable: true })
  idNumberOrPassport?: String;  // Changed to match the input

  @Field(() => String, { nullable: true })
  nationality?: String;

  @Field(() => String, { nullable: true })
  gender?: String;

  @Field(() => String, { nullable: true })
  homeLanguage?: String;  // Changed to match the input

  @Field(() => String, { nullable: true })
  resAddress?: String;

  @Field(() => String, { nullable: true })
  postAddress?: String;

  @Field(() => String, { nullable: true })
  phoneNumber?: String;

  @Field(() => String, { nullable: true })
  parentOrGuardian?: String;

  @Field(() => String, { nullable: true })
  emailAddress?: String;  // Added emailAddress

  @Field(() => String, { nullable: true })
  parentOrGuardianPhoneNumber?: String;  // Added parentOrGuardianPhoneNumber

  @Field(() => String, { nullable: true })
  parentOrGuardianEmail?: String;  // Added parentOrGuardianEmail

  @Field(() => String, { nullable: true })
  parentOrGuardianOccupation?: String;  // Added parentOrGuardianOccupation

  @Field(() => String, { nullable: true })
  parentOrGuardianWorkPhoneNumber?: String;  // Added parentOrGuardianWorkPhoneNumber

  @Field(() => String, { nullable: true })
  parentOrGuardianWorkAddress?: String;  // Added parentOrGuardianWorkAddress

  @Field(() => String, { nullable: true })
  parentOrGuardianHouseholdIncome?: String;  // Added parentOrGuardianHouseholdIncome

  @Field(() => String, { nullable: true })
  schoolName?: String;  // Added schoolName

  @Field(() => String, { nullable: true })
  examinationBoard?: String;  // Added examinationBoard

  @Field(() => String, { nullable: true })
  grade12Results?: String;  // Added grade12Results

  @Field(() => String, { nullable: true })
  grade11Results?: String;  // Added grade11Results

  @Field(() => [String], { nullable: false })
  messages!: String[];
}

