import { SETTINGS } from './../../common/constants/settings';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { IChuckNorrisRepository } from './interfaces/chuck-norris-data.interface';

@Injectable()
export class ChuckNorrisRepository implements IChuckNorrisRepository {
  constructor(private readonly httpService: HttpService) {}

  async getJokes(query: string): Promise<any> {
    const url = `${SETTINGS.API_BASE_URL}/search?query=${query}`;

    const data = await firstValueFrom(
      this.httpService.get(url).pipe(map((response) => response.data)),
    ).catch(() => {
      return null;
    });

    return data;
  }

  async getRandomFact(category?: string): Promise<any> {
    let url = `${SETTINGS.API_BASE_URL}/random`;
    if (category) url += `?category=${encodeURIComponent(category)}`;

    const data = await firstValueFrom(
      this.httpService.get(url).pipe(map((response) => response.data)),
    ).catch(() => {
      return null;
    });

    return data;
  }

  async getCategories(): Promise<string[]> {
    const url = `${SETTINGS.API_BASE_URL}/categories`;

    const data = await firstValueFrom(
      this.httpService.get(url).pipe(map((response) => response.data)),
    ).catch(() => {
      return null;
    });

    return data;
  }
}
