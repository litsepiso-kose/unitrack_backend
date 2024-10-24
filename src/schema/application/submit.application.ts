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
    typeId: String;
    @Field(() => String,)
    deadline: String;
    @Field(() => String, { nullable: true })
    status: String;
    @Field(() => String, { nullable: true })
    type: "Bursary" | "University";
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

    @Field(() => String, { nullable: true })
    status?: String;

    @Field(() => String, { nullable: true })
    type?: "Bursary" | "University";

    @Field(() => [String], { nullable: false })
    messages!: String[];
}

