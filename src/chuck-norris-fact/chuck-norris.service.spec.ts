import { Test, TestingModule } from '@nestjs/testing';
import { ChuckNorrisService } from './chuck-norris.service';
import { ChuckNorrisEntity } from './../models/chuck-norris/entities/chuck-norris.entity';
import { IChuckNorrisRepository } from './../models/chuck-norris/interfaces/chuck-norris-data.interface';
import { IChuckNorrisTransformationService } from './interfaces/chuck-norris-transformation.interface';
import { BadRequestException } from './../common/exceptions/bad-request.exception';

describe('ChuckNorrisService', () => {
  let service: ChuckNorrisService;
  let mockDataService: IChuckNorrisRepository;
  let mockTransformationService: IChuckNorrisTransformationService;

  const mockChuckNorrisEntity: ChuckNorrisEntity = {
    id: '1',
    value: 'A joke',
    icon_url: 'https://example.com/icon.png',
    url: 'https://example.com/joke',
  };

  beforeEach(async () => {
    mockDataService = {
      getJokes: jest.fn(),
      getRandomFact: jest.fn(),
      getCategories: jest.fn(),
    };

    mockTransformationService = {
      mapToChuckNorris: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChuckNorrisService,
        { provide: 'IChuckNorrisRepository', useValue: mockDataService },
        {
          provide: 'IChuckNorrisTransformationService',
          useValue: mockTransformationService,
        },
      ],
    }).compile();

    service = module.get<ChuckNorrisService>(ChuckNorrisService);
  });

  describe('getRandomJokeByText', () => {
    it('should return a random joke', async () => {
      const query = 'funny';
      const jokes = [
        { id: '1', value: 'A joke' },
        { id: '2', value: 'Another joke' },
      ];
      mockDataService.getJokes = jest.fn().mockResolvedValue({ result: jokes });
      mockTransformationService.mapToChuckNorris = jest
        .fn()
        .mockReturnValue(mockChuckNorrisEntity);

      const result = await service.getRandomJokeByText(query);

      expect(result).toEqual(mockChuckNorrisEntity);
      expect(mockDataService.getJokes).toHaveBeenCalledWith(query);
      expect(mockTransformationService.mapToChuckNorris).toHaveBeenCalled();
    });

    it('should throw BadRequestException if no jokes found', async () => {
      const query = 'funny';
      mockDataService.getJokes = jest.fn().mockResolvedValue({ result: [] });

      await expect(service.getRandomJokeByText(query)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getRandomFact', () => {
    it('should return a random fact', async () => {
      const category = 'animal';
      mockDataService.getRandomFact = jest
        .fn()
        .mockResolvedValue({ id: '1', value: 'A fact' });
      mockTransformationService.mapToChuckNorris = jest
        .fn()
        .mockReturnValue(mockChuckNorrisEntity);

      const result = await service.getRandomFact(category);

      expect(result).toEqual(mockChuckNorrisEntity);
      expect(mockDataService.getRandomFact).toHaveBeenCalledWith(category);
      expect(mockTransformationService.mapToChuckNorris).toHaveBeenCalled();
    });

    it('should throw BadRequestException if no fact found', async () => {
      const category = 'animal';
      mockDataService.getRandomFact = jest.fn().mockResolvedValue(null);

      await expect(service.getRandomFact(category)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getCategories', () => {
    it('should return categories', async () => {
      const categories = ['animal', 'career'];
      mockDataService.getCategories = jest.fn().mockResolvedValue(categories);

      const result = await service.getCategories();

      expect(result).toEqual(categories);
      expect(mockDataService.getCategories).toHaveBeenCalled();
    });

    it('should throw BadRequestException if categories are not found (null response)', async () => {
      jest.spyOn(mockDataService, 'getCategories').mockResolvedValue(null);

      await expect(service.getCategories()).rejects.toThrow(
        new BadRequestException('Categorias não encontradas'),
      );
    });
  });
});
