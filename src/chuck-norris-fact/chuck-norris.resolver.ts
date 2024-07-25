import { Args, Query, Resolver } from '@nestjs/graphql';
import { ChuckNorris } from './chuck-norris.model';
import { ChuckNorrisService } from './chuck-norris.service';

@Resolver(() => ChuckNorris)
export class ChuckNorrisFactResolver {
  constructor(private chuckNorrisService: ChuckNorrisService) {}

  @Query(() => ChuckNorris)
  async getRandomFact() {
    return this.chuckNorrisService.getRandomFact();
  }

  @Query(() => ChuckNorris)
  async getRandomFactByCategory(@Args('category') category: string) {
    return this.chuckNorrisService.getRandomFactByCategory(category);
  }
}
