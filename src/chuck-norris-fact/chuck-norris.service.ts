import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ChuckNorris } from './chuck-norris.model';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ChuckNorrisService {
  constructor(private readonly httpService: HttpService) {}

  async getRandomFactByCategory(category: string): Promise<ChuckNorris> {
    const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
    return new Promise<ChuckNorris>((resolve, reject) => {
      this.httpService
        .get(url)
        .pipe(
          map((response) => ({
            id: response.data.id,
            value: response.data.value,
            icon_url: response.data.icon_url,
            url: response.data.url,
          })),
        )
        .subscribe({
          next: (data) => {
            console.log('Alo', data);
            resolve(data);
          },
          error: (error) => {
            console.error('Error:', error);
            reject(error);
          },
        });
    });
  }

  async getCategories(): Promise<string[]> {
    const url = 'https://api.chucknorris.io/jokes/categories';
    const response = await this.httpService.get(url).toPromise();
    return response.data;
  }

  async getRandomFact(): Promise<ChuckNorris> {
    const url = 'https://api.chucknorris.io/jokes/random';
    const data = await firstValueFrom(
      this.httpService.get(url).pipe(
        map((response) => {
          return {
            id: response.data.id,
            value: response.data.value,
            icon_url: response.data.icon_url,
            url: response.data.url,
          };
        }),
      ),
    );
    return data;
  }
}
