import { ChuckNorrisRepositoryModule } from './../models/chuck-norris/chuck-norris.module';
import { Module } from '@nestjs/common';
import { ChuckNorrisFactResolver } from './chuck-norris.resolver';
import { ChuckNorrisController } from './chuck-norris.controller';
import { ChuckNorrisService } from './chuck-norris.service';
import { ChuckNorrisTransformationService } from './helpers/chuck-norris-transformation.service';

@Module({
  imports: [ChuckNorrisRepositoryModule],
  controllers: [ChuckNorrisController],
  providers: [
    ChuckNorrisService,
    ChuckNorrisFactResolver,
    {
      provide: 'IChuckNorrisTransformationService',
      useClass: ChuckNorrisTransformationService,
    },
  ],
})
export class ChuckNorrisModule {}
