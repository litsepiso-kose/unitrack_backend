import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class ApplicationInput {
    @Field(() => String)
    name: String;
    @Field(() => String, { nullable: true })
    description: String;
    @Field(() => String)
    url: String;
    @Field(() => String, { nullable: true })
    fullName: String;
    @Field(() => String,)
    deadline: String;
    @Field(() => String, { nullable: true })
    status: String;
    @Field(() => Number, { nullable: true })
    type: Number;
}

@ObjectType()
export class ApplicationOutput {
    @Field(() => String, { nullable: true })
    name?: String;

    @Field(() => String, { nullable: true })
    description?: String;

    @Field(() => String, { nullable: true })
    url?: String;

    @Field(() => String, { nullable: true })
    fullName?: String;

    @Field(() => String, { nullable: true })
    typeId?: String;

    @Field(() => String, { nullable: true })
    deadline?: String;

    @Field(() => Number, { nullable: true })
    status?: Number;

    @Field(() => Number, { nullable: true })
    type?: Number;

    @Field(() => [String], { nullable: false })
    messages!: String[];

    @Field(() => Boolean,)
    succeeded!: Boolean;
}
