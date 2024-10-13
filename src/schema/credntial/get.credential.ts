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
  idNumber?: String;

  @Field(() => String, { nullable: true })
  nationality?: String;

  @Field(() => String, { nullable: true })
  gender?: String;

  @Field(() => String, { nullable: true })
  home_language?: String;

  @Field(() => String, { nullable: true })
  resAddress?: String;

  @Field(() => String, { nullable: true })
  postAddress?: String;

  @Field(() => String, { nullable: true })
  phoneNumber?: String;

  @Field(() => String, { nullable: true })
  parentOrGuardian?: String;

  @Field(() => [String], { nullable: false })
  messages!: String[];
}
