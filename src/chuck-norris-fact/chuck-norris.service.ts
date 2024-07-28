import { ChuckNorrisEntity } from './../models/chuck-norris/entities/chuck-norris.entity';
import { IChuckNorrisRepository } from './../models/chuck-norris/interfaces/chuck-norris-data.interface';
import { BadRequestException } from './../common/exceptions/bad-request.exception';
import { Inject, Injectable } from '@nestjs/common';
import { IChuckNorrisTransformationService } from './interfaces/chuck-norris-transformation.interface';

@Injectable()
export class ChuckNorrisService {
  constructor(
    @Inject('IChuckNorrisRepository')
    private readonly dataService: IChuckNorrisRepository,

    @Inject('IChuckNorrisTransformationService')
    private readonly transformationService: IChuckNorrisTransformationService,
  ) {}

  async getRandomJokeByText(query: string): Promise<ChuckNorrisEntity> {
    const data = await this.dataService.getJokes(query);
    const jokes = data.result;
    if (jokes.length === 0)
      throw new BadRequestException('Piada não encontrada');

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    return this.transformationService.mapToChuckNorris(randomJoke);
  }

  async getRandomFact(category?: string): Promise<ChuckNorrisEntity> {
    const data = await this.dataService.getRandomFact(category);

    if (!data)
      throw new BadRequestException(
        `Não foi possível encontrar o fato aleatório: ${category}`,
      );

    return this.transformationService.mapToChuckNorris(data);
  }

  async getCategories(): Promise<string[]> {
    const data = this.dataService.getCategories();
    if (!data) throw new BadRequestException(`Categorias não encontrada`);

    return data;
  }
}
