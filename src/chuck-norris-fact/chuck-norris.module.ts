import { Module } from '@nestjs/common';
import { ChuckNorrisFactResolver } from './chuck-norris.resolver';
import { ChuckNorrisController } from './chuck-norris.controller';
import { ChuckNorrisService } from './chuck-norris.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ChuckNorrisController],
  providers: [ChuckNorrisService, ChuckNorrisFactResolver],
})
export class ChuckNorrisModule {}
