import { Controller, Get, Param } from '@nestjs/common';
import { ChuckNorrisService } from './chuck-norris.service';

@Controller('/chuck-norris-fact')
export class ChuckNorrisController {
  constructor(private readonly chuckNorrisService: ChuckNorrisService) {}

  @Get()
  async getRandomFact() {
    const data = await this.chuckNorrisService.getRandomFact();
    return { data };
  }

  @Get(':category')
  async getUserById(@Param('category') category: string) {
    const data =
      await this.chuckNorrisService.getRandomFactByCategory(category);

    return { data };
  }
}
