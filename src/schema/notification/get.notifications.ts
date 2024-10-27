import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class NotificationOutput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    id: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    applicationId: string;

    @Field(() => Date)
    deadline: Date;
    
    @Field(() => [String], { nullable: false })
    messages!: String[];

    @Field(() => Boolean)
    succeeded!: boolean;
}