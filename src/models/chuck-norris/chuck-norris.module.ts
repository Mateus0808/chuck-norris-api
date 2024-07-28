import { Module } from '@nestjs/common';
import { ChuckNorrisRepository } from './chuck-norris.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [
    {
      provide: 'IChuckNorrisRepository',
      useClass: ChuckNorrisRepository,
    },
  ],
  exports: [
    {
      provide: 'IChuckNorrisRepository',
      useClass: ChuckNorrisRepository,
    },
  ],
})
export class ChuckNorrisRepositoryModule {}
