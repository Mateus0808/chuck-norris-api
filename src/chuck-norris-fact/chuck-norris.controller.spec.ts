import { ChuckNorrisController } from './chuck-norris.controller';
import { ChuckNorrisService } from './chuck-norris.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ChuckNorrisController', () => {
  let controller: ChuckNorrisController;
  let service: ChuckNorrisService;

  const mockChuckNorrisService = {
    getCategories: jest.fn(() => ['animal', 'career']),
    getRandomJokeByText: jest.fn((query) => ({ value: `Joke about ${query}` })),
    getRandomFact: jest.fn((category) => ({
      value: `Random joke from ${category}`,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChuckNorrisController],
      providers: [
        {
          provide: ChuckNorrisService,
          useValue: mockChuckNorrisService,
        },
      ],
    }).compile();

    controller = module.get<ChuckNorrisController>(ChuckNorrisController);
    service = module.get<ChuckNorrisService>(ChuckNorrisService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCategories', () => {
    it('should return categories', async () => {
      const result = await controller.getCategories();
      expect(result).toEqual({ categories: ['animal', 'career'] });
      expect(service.getCategories).toHaveBeenCalled();
    });
  });

  describe('getRandomJokeByText', () => {
    it('should return a joke based on query', async () => {
      const query = 'funny';
      const result = await controller.getRandomJokeByText({ query });
      expect(result).toEqual({ data: { value: `Joke about ${query}` } });
      expect(service.getRandomJokeByText).toHaveBeenCalledWith(query);
    });
  });

  describe('getRandomJoke', () => {
    it('should return a random joke based on category', async () => {
      const category = 'animal';
      const result = await controller.getRandomJoke(category);
      expect(result).toEqual({
        data: { value: `Random joke from ${category}` },
      });
      expect(service.getRandomFact).toHaveBeenCalledWith(category);
    });
  });
});
