export interface IChuckNorrisRepository {
  getJokes(query: string): Promise<any>;

  getRandomFact(category?: string): Promise<any>;

  getCategories(): Promise<string[]>;
}
