import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class UserApplicationInput {
    @Field(() => String)
    applicationId: string;

    @Field(() => Number, { nullable: true })
    status?: number;
}

@ObjectType()
export class UserApplicationOutput {
    @Field(() => String, { nullable: true })
    id!: String;

    @Field(() => String)
    userId!: String;

    @Field(() => String)
    applicationId!: String;

    @Field(() => Number, { nullable: true })
    status?: number;

    @Field(() => [String], { nullable: false })
    messages!: String[];

    @Field(() => Boolean)
    succeeded!: boolean;
}

@ObjectType()
export class ApplicationDataOutput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    id: string;

    @Field(() => String)
    description: string;

    @Field(() => Number)
    type: number;

    @Field(() => Date)
    deadline: Date;

    @Field(() => [String], { nullable: true })
    courses?: string[];

    @Field(() => Number,)
    status: Number;

    @Field(() => String)
    applyLink: string;

    @Field(() => [String], { nullable: false })
    messages!: string[];

    @Field(() => Boolean)
    succeeded!: boolean;
}