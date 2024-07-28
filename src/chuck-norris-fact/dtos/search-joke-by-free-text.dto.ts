import { IsNotEmpty, IsString } from 'class-validator';

export class SearchByQueryParams {
  @IsString()
  @IsNotEmpty()
  query: string;
}
