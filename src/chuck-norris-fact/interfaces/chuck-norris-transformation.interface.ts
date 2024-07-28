import { ChuckNorrisEntity } from '../../models/chuck-norris/entities/chuck-norris.entity';

export interface IChuckNorrisTransformationService {
  mapToChuckNorris(data: any): ChuckNorrisEntity;
}
