import { Controller, Get, Query } from '@nestjs/common';
import { ChuckNorrisService } from './chuck-norris.service';
import { SearchByQueryParams } from './dtos/search-joke-by-free-text.dto';

@Controller('/chuck-norris-fact')
export class ChuckNorrisController {
  constructor(private readonly chuckNorrisService: ChuckNorrisService) {}

  @Get('/categories')
  async getCategories() {
    const data = await this.chuckNorrisService.getCategories();
    return { categories: data };
  }

  @Get('/free-text')
  async getRandomJokeByText(@Query() params: SearchByQueryParams) {
    const data = await this.chuckNorrisService.getRandomJokeByText(
      params.query,
    );

    return { data };
  }

  @Get('/random')
  async getRandomJoke(@Query('category') category: string) {
    const data = await this.chuckNorrisService.getRandomFact(category);

    return { data };
  }
}
