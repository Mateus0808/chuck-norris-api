import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChuckNorrisEntity {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  value: string;

  @Field()
  icon_url?: string;

  @Field({ nullable: false })
  url: string;

  @Field(() => [String], { nullable: true })
  categories?: string[];
}
