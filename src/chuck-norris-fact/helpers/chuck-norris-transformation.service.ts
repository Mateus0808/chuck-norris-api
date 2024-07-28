import { Injectable } from '@nestjs/common';
import { IChuckNorrisTransformationService } from '../interfaces/chuck-norris-transformation.interface';
import { ChuckNorrisEntity } from '../../models/chuck-norris/entities/chuck-norris.entity';

@Injectable()
export class ChuckNorrisTransformationService
  implements IChuckNorrisTransformationService
{
  mapToChuckNorris(data: any): ChuckNorrisEntity {
    return {
      id: data.id,
      value: data.value,
      icon_url: data.icon_url,
      url: data.url,
      categories: data.categories,
    };
  }
}
