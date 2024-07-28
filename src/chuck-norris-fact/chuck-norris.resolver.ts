import { Args, Query, Resolver } from '@nestjs/graphql';
import { ChuckNorrisEntity } from '../models/chuck-norris/entities/chuck-norris.entity';
import { ChuckNorrisService } from './chuck-norris.service';

@Resolver(() => ChuckNorrisEntity)
export class ChuckNorrisFactResolver {
  constructor(private chuckNorrisService: ChuckNorrisService) {}

  @Query(() => ChuckNorrisEntity)
  async getRandomFact(@Args('category') category: string) {
    return this.chuckNorrisService.getRandomFact(category);
  }

  @Query(() => ChuckNorrisEntity)
  async getRandomJokeByText(@Args('query') query: string) {
    return this.chuckNorrisService.getRandomJokeByText(query);
  }
}
