import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChuckNorris {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  value: string;

  @Field({ nullable: false })
  icon_url: string;

  @Field({ nullable: false })
  url: string;
}
