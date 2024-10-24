import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class VerifyTokenOutput {
  @Field(() => Boolean)
  isValid!: Boolean;

  @Field(() => String, { nullable: true })
  email!: String;


  @Field(() => String, { nullable: true })
  voiceLanguage!: String;

  @Field(() => String)
  token!: String;

  @Field(() => Number, { nullable: true })
  userType!: Number;
}